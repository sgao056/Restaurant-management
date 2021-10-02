package com.ucareer.backend.menuItems;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("MenuItemService")
public class MenuItemService {

    @Autowired
    MenuItemRepository menuItemRepository;

    public List<MenuItem> listMenuItems(){
        List<MenuItem> list = menuItemRepository.findAll();
        return list;
    }

    public MenuItem getMenuItem(Long id){
        MenuItem foundOne = new MenuItem();
        foundOne = menuItemRepository.findById(id).orElse(null);
        return foundOne;
    }

    public MenuItem createMenuItem(MenuItem menuItem){
        MenuItem newOne = menuItemRepository.save(menuItem);
        return newOne;
    }

    public MenuItem updateMenuItem(MenuItem foundOne, MenuItem menuItem){
        if(menuItem.getPicture()!=null){
            foundOne.setPicture(menuItem.getPicture());
        }
        if(menuItem.getName()!=null){
            foundOne.setName(menuItem.getName());
        }
        if(menuItem.getIntroduction()!=null){
            foundOne.setIntroduction(menuItem.getIntroduction());
        }
        if(menuItem.getPrice()!=null){
            foundOne.setPrice(menuItem.getPrice());
        }
        MenuItem savedOne = new MenuItem();
        savedOne = menuItemRepository.save(foundOne);
        return savedOne;
    }

    public boolean deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
        return true;
    }
}
