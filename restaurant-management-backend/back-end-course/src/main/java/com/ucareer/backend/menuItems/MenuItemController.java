package com.ucareer.backend.menuItems;

import com.ucareer.backend.ResponseBody;
import com.ucareer.backend.util.TokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.SignatureException;
import java.util.List;
@RestController
@CrossOrigin("*")

public class MenuItemController {
    final MenuItemService menuItemService;

    @Autowired
    public MenuItemController(MenuItemService menuItemService){
        this.menuItemService = menuItemService;
    }


    @GetMapping("api/v1/landings/me/menuItems")
    public ResponseEntity<ResponseBody> getAll(){
        try{
            List<MenuItem> foundList;
            foundList = menuItemService.listMenuItems();
            ResponseBody<List> responseBody = new ResponseBody();
            responseBody.setResult(foundList);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);

        }catch(Exception ex){
            return ResponseEntity.internalServerError().build();
        }
    }


    @GetMapping("api/v1/landings/me/menuItems/{id}")
    public ResponseEntity<ResponseBody> getMenuItem(@PathVariable Long id){
        try{
            MenuItem foundOne = menuItemService.getMenuItem(id);
            ResponseBody<MenuItem> responseBody = new ResponseBody();
            if(foundOne == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
            }
            responseBody.setResult(foundOne);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        }
        catch(Exception ex){
            return ResponseEntity.internalServerError().build();
        }
    }

//    @GetMapping("api/v1/landings/me/menuItems/{id}")
//    public ResponseEntity<ResponseBody> getMenuItem(@RequestHeader("Authorization") String token, @PathVariable Long id){
//        try{
//            String username = TokenHelper.VerifyToken(token);
//            MenuItem foundOne = menuItemService.getMenuItem(id);
//            ResponseBody<MenuItem> responseBody = new ResponseBody();
//            if(foundOne == null){
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
//            }
//            responseBody.setResult(foundOne);
//            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
//        } catch (SignatureException sEx){
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//        }
//        catch(Exception ex){
//            return ResponseEntity.internalServerError().build();
//        }
//    }


    @PostMapping("api/v1/landings/me/menuItems")
    public ResponseEntity<ResponseBody> createMenuItem(@RequestBody MenuItem menuItem){
        try{
            MenuItem newOne = menuItemService.createMenuItem(menuItem);
            ResponseBody<MenuItem> responseBody = new ResponseBody<>();
            responseBody.setResult(newOne);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch(Exception ex){
            return ResponseEntity.internalServerError().build();
        }
    }


    @PutMapping("api/v1/landings/me/menuItems/{id}")
    public ResponseEntity<ResponseBody> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem){
        try{
            MenuItem foundOne = menuItemService.getMenuItem(id);
            ResponseBody<MenuItem> responseBody = new ResponseBody<>();
            if(foundOne == null){
                responseBody.setError(new Exception("404 NOT FOUND"));
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
            }
            MenuItem newOne = menuItemService.updateMenuItem(foundOne, menuItem);
            responseBody.setResult(newOne);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch(Exception ex){
            return ResponseEntity.internalServerError().build();
        }

    }

    @DeleteMapping("api/v1/landings/me/menuItems/{id}")
    public ResponseEntity<ResponseBody> deleteMenuItem(@PathVariable Long id){
        ResponseBody<Boolean> responseBody = new ResponseBody<>();
        try{
            boolean deleted = menuItemService.deleteMenuItem(id);
            responseBody.setResult(deleted);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch(EmptyResultDataAccessException emptyRs){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception ex){
            return ResponseEntity.internalServerError().build();
        }
    }
}