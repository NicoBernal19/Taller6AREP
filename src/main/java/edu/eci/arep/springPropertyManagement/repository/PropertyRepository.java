package edu.eci.arep.springPropertyManagement.repository;

import edu.eci.arep.springPropertyManagement.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}
