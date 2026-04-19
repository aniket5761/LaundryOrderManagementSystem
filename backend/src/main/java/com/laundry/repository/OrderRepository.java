package com.laundry.repository;

import com.laundry.entity.Order;
import com.laundry.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

    @Query("SELECT o FROM Order o WHERE o.status = :status")
    List<Order> findByStatus(@Param("status") OrderStatus status);

    @Query("SELECT o FROM Order o WHERE LOWER(o.customerName) LIKE LOWER(CONCAT('%', :customerName, '%'))")
    List<Order> findByCustomerNameContaining(@Param("customerName") String customerName);

    @Query("SELECT o FROM Order o WHERE o.phoneNumber = :phoneNumber")
    List<Order> findByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    @Query("SELECT DISTINCT o FROM Order o JOIN o.items i WHERE LOWER(i.garmentType) LIKE LOWER(CONCAT('%', :garmentType, '%'))")
    List<Order> findOrdersByGarmentType(@Param("garmentType") String garmentType);

    @Query("SELECT COUNT(o) FROM Order o")
    Long countTotalOrders();

    @Query("SELECT SUM(o.totalAmount) FROM Order o")
    BigDecimal sumTotalRevenue();

    @Query("SELECT o.status, COUNT(o) FROM Order o GROUP BY o.status")
    List<Object[]> countByStatus();
}
