package com.ucareer.backend.menuItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem,Long>{
    MenuItem findDistinctById(Long id);
}
