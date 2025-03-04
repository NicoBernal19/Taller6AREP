package edu.eci.arep.springPropertyManagement.service;

import edu.eci.arep.springPropertyManagement.model.Property;
import edu.eci.arep.springPropertyManagement.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    private final PropertyRepository repository;

    public PropertyService(PropertyRepository repository) {
        this.repository = repository;
    }

    public List<Property> getAllProperties() {
        return repository.findAll();
    }

    public Optional<Property> getPropertyById(Long id) {
        return repository.findById(id);
    }

    public Property createProperty(Property property) {
        return repository.save(property);
    }

    public Property updateProperty(Long id, Property property) {
        return repository.findById(id).map(existing -> {
            existing.setAddress(property.getAddress());
            existing.setPrice(property.getPrice());
            existing.setSize(property.getSize());
            existing.setDescription(property.getDescription());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Property not found"));
    }

    public void deleteProperty(Long id) {
        repository.deleteById(id);
    }

    public List<Property> searchProperties(String address, Double minPrice, Double maxPrice, Integer minSize, Integer maxSize) {
        return repository.searchProperties(address, minPrice, maxPrice, minSize, maxSize);
    }
}
