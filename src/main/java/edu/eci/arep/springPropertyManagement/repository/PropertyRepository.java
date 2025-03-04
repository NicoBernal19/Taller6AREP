package edu.eci.arep.springPropertyManagement.repository;

import edu.eci.arep.springPropertyManagement.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByAddressContainingIgnoreCase(String address);

    List<Property> findByPriceBetween(double minPrice, double maxPrice);

    List<Property> findBySizeBetween(int minSize, int maxSize);

    @Query("SELECT p FROM Property p WHERE " +
            "(:address IS NULL OR LOWER(p.address) LIKE LOWER(CONCAT('%', :address, '%'))) AND " +
            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
            "(:minSize IS NULL OR p.size >= :minSize) AND " +
            "(:maxSize IS NULL OR p.size <= :maxSize)")
    List<Property> searchProperties(@Param("address") String address,
                                    @Param("minPrice") Double minPrice,
                                    @Param("maxPrice") Double maxPrice,
                                    @Param("minSize") Integer minSize,
                                    @Param("maxSize") Integer maxSize);
}
