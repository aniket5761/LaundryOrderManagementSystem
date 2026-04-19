package com.laundry.service;

import com.laundry.dto.*;
import com.laundry.entity.Order;
import com.laundry.entity.OrderItem;
import com.laundry.entity.OrderStatus;
import com.laundry.exception.InvalidOrderException;
import com.laundry.exception.ResourceNotFoundException;
import com.laundry.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public CreateOrderResponse createOrder(CreateOrderRequest request) {
        // Validate request
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new InvalidOrderException("Order must contain at least one item");
        }

        // Create order entity
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setPhoneNumber(request.getPhoneNumber());
        order.setStatus(OrderStatus.RECEIVED);

        // Calculate total amount and create order items
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> items = new ArrayList<>();

        for (CreateOrderItemRequest itemRequest : request.getItems()) {
            OrderItem item = new OrderItem();
            item.setGarmentType(itemRequest.getGarmentType());
            item.setQuantity(itemRequest.getQuantity());
            item.setPricePerItem(itemRequest.getPricePerItem());
            item.setOrder(order);

            totalAmount = totalAmount.add(item.getTotalPrice());
            items.add(item);
        }

        order.setTotalAmount(totalAmount);
        order.setItems(items);

        // Save order to database
        Order savedOrder = orderRepository.save(order);

        // Return response
        return new CreateOrderResponse(
                savedOrder.getId(),
                savedOrder.getTotalAmount(),
                savedOrder.getStatus().toString()
        );
    }

    @Override
    public OrderResponse getOrderById(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        return mapOrderToResponse(order);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapOrderToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getOrdersByStatus(OrderStatus status) {
        List<Order> orders = orderRepository.findByStatus(status);
        return orders.stream()
                .map(this::mapOrderToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> searchOrdersByCustomerName(String customerName) {
        List<Order> orders = orderRepository.findByCustomerNameContaining(customerName);
        return orders.stream()
                .map(this::mapOrderToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getOrdersByPhoneNumber(String phoneNumber) {
        List<Order> orders = orderRepository.findByPhoneNumber(phoneNumber);
        return orders.stream()
                .map(this::mapOrderToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> searchOrdersByGarmentType(String garmentType) {
        List<Order> orders = orderRepository.findOrdersByGarmentType(garmentType);
        return orders.stream()
                .map(this::mapOrderToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(UUID orderId, UpdateOrderStatusRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        try {
            OrderStatus newStatus = OrderStatus.valueOf(request.getStatus().toUpperCase());
            order.setStatus(newStatus);
            Order updatedOrder = orderRepository.save(order);
            return mapOrderToResponse(updatedOrder);
        } catch (IllegalArgumentException e) {
            throw new InvalidOrderException("Invalid status: " + request.getStatus() + ". Valid statuses are: " +
                    Arrays.toString(OrderStatus.values()));
        }
    }

    @Override
    public DashboardResponse getDashboardStats() {
        Long totalOrders = orderRepository.countTotalOrders();
        BigDecimal totalRevenue = orderRepository.sumTotalRevenue();

        // Initialize map with all statuses as 0
        Map<String, Long> ordersByStatus = new HashMap<>();
        for (OrderStatus status : OrderStatus.values()) {
            ordersByStatus.put(status.toString(), 0L);
        }

        // Get counts from database
        List<Object[]> statusCounts = orderRepository.countByStatus();
        for (Object[] row : statusCounts) {
            OrderStatus status = (OrderStatus) row[0];
            Long count = (Long) row[1];
            ordersByStatus.put(status.toString(), count);
        }

        return new DashboardResponse(
                totalOrders != null ? totalOrders : 0L,
                totalRevenue != null ? totalRevenue : BigDecimal.ZERO,
                ordersByStatus
        );
    }

    // Helper method to map Order entity to OrderResponse DTO
    private OrderResponse mapOrderToResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems().stream()
                .map(item -> new OrderItemResponse(
                        item.getId(),
                        item.getGarmentType(),
                        item.getQuantity(),
                        item.getPricePerItem(),
                        item.getTotalPrice()
                ))
                .collect(Collectors.toList());

        return new OrderResponse(
                order.getId(),
                order.getCustomerName(),
                order.getPhoneNumber(),
                order.getStatus().toString(),
                order.getTotalAmount(),
                order.getCreatedAt(),
                order.getUpdatedAt(),
                itemResponses
        );
    }
}
