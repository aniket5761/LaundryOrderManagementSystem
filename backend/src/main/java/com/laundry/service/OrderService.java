package com.laundry.service;

import com.laundry.dto.*;
import com.laundry.entity.OrderStatus;
import java.util.List;
import java.util.UUID;

public interface OrderService {

    CreateOrderResponse createOrder(CreateOrderRequest request);

    OrderResponse getOrderById(UUID orderId);

    List<OrderResponse> getAllOrders();

    List<OrderResponse> getOrdersByStatus(OrderStatus status);

    List<OrderResponse> searchOrdersByCustomerName(String customerName);

    List<OrderResponse> getOrdersByPhoneNumber(String phoneNumber);

    List<OrderResponse> searchOrdersByGarmentType(String garmentType);

    OrderResponse updateOrderStatus(UUID orderId, UpdateOrderStatusRequest request);

    DashboardResponse getDashboardStats();
}
