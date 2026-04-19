package com.laundry.controller;

import com.laundry.dto.*;
import com.laundry.entity.OrderStatus;
import com.laundry.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderController {

    private final OrderService orderService;

    /**
     * Create a new order
     */
    @PostMapping
    public ResponseEntity<CreateOrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        CreateOrderResponse response = orderService.createOrder(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get order by ID
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable UUID orderId) {
        OrderResponse response = orderService.getOrderById(orderId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get all orders with optional filters
     */
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrders(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String customerName,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String garmentType) {

        List<OrderResponse> orders;

        if (status != null && !status.isEmpty()) {
            OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
            orders = orderService.getOrdersByStatus(orderStatus);
        } else if (customerName != null && !customerName.isEmpty()) {
            orders = orderService.searchOrdersByCustomerName(customerName);
        } else if (phoneNumber != null && !phoneNumber.isEmpty()) {
            orders = orderService.getOrdersByPhoneNumber(phoneNumber);
        } else if (garmentType != null && !garmentType.isEmpty()) {
            orders = orderService.searchOrdersByGarmentType(garmentType);
        } else {
            orders = orderService.getAllOrders();
        }

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    /**
     * Update order status
     */
    @PatchMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable UUID orderId,
            @Valid @RequestBody UpdateOrderStatusRequest request) {
        OrderResponse response = orderService.updateOrderStatus(orderId, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get dashboard statistics
     */
    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardResponse> getDashboardStats() {
        DashboardResponse response = orderService.getDashboardStats();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
