package com.ucareer.backend.users;

import com.ucareer.backend.ResponseBody;
import com.ucareer.backend.util.TokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SignatureException;
import java.util.List;

@RestController
@CrossOrigin("*")
/*
    in this class,
    all of them just use responseBody instead of Users
 */
public class UserController {

    //use User Service which have the details of the logic
    @Autowired
    UserService userService;


    /*
    return a ResponseEntity, statusOk means 200, internalServerError means internet error
    get a User List then put them to RequestBody's result,
     */
    @GetMapping("api/v1/users")
    public ResponseEntity<ResponseBody> findAllUser() {
        try {
            List<User> findAll = userService.findAllUser();
            com.ucareer.backend.ResponseBody<List> responseBody = new com.ucareer.backend.ResponseBody();
            responseBody.setResult(findAll);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /*
    get a User then put it to RequestBody's result,
     */
    @GetMapping("api/v1/users/{id}")
    public ResponseEntity<ResponseBody> findAUser(@PathVariable Long id) {
        try {
            User findOne = userService.findOneUser(id);
            com.ucareer.backend.ResponseBody<User> responseBody = new com.ucareer.backend.ResponseBody();
            if (findOne == null) {
                responseBody.setMessage("item " + id + " can not be found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
            }
            responseBody.setResult(findOne);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }


    /*
    create a User then put it to RequestBody's result,
     */
    @PostMapping("api/v1/users")
    public ResponseEntity<ResponseBody> createAUser(@RequestBody User user) {
        try {
            User createOne = userService.createOneUser(user);
            com.ucareer.backend.ResponseBody<User> responseBody = new com.ucareer.backend.ResponseBody();
            responseBody.setResult(createOne);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().build();
        }
    }


    /*
    update a User then put it to RequestBody's result,
     */
    @PutMapping("api/v1/users/{id}")
    public ResponseEntity<ResponseBody> updateOneUser(@PathVariable Long id, @RequestBody User user) {
        try {
            User findOne = userService.findOneUser(id);
            com.ucareer.backend.ResponseBody<User> responseBody = new com.ucareer.backend.ResponseBody();
            if (findOne == null) {
                responseBody.setMessage("item " + id + " can not be found");
                responseBody.setError(new Exception("item can not be found"));
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
            }
            User saveOne = userService.updateOneUser(id, user);
            responseBody.setResult(saveOne);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }


    /*
    delete a User then return success to RequestBody's result,
     */
    @DeleteMapping("api/v1/users/{id}")
    public ResponseEntity<ResponseBody> deleteOneUser(@PathVariable Long id) {
        com.ucareer.backend.ResponseBody<Boolean> responseBody = new ResponseBody();
        try {
            boolean success = userService.deleteOneUser(id);
            responseBody.setResult(success);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    /*
    Register user
    1. check user if exist or not(userService.getByUsername) exist: alert already exist
    2. not exist, save user
     */
    @PostMapping("api/v1/auth/register")
    public ResponseEntity<ResponseBody> register(@RequestBody User userBody) {
        try {
            ResponseBody<User> responseBody = new ResponseBody();
            //validation
            //if user's username is null or it's empty(no value), then return status is bad request
            if (userBody.getUsername() == null || userBody.getUsername().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
            }

            //if user's password is null or it's empty(no value), then return status is bad request
            if (userBody.getPassword() == null || userBody.getPassword().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
            }

            if (userBody.getConfirm_password()== null || userBody.getConfirm_password().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
            }

            //find user
            User findUser = this.userService.getByUsername(userBody.getUsername());
            //if user exist
            if (findUser != null) {
                responseBody.setMessage("This User already exist");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
            }
            //user not exist, then save
            userBody.setStatus("Initial");
            User saveUser = this.userService.saveUser(userBody);
            responseBody.setMessage("User create successful");
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            //server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /*
    Login user
    1. check input value's format
    2. check password can match or not
    3. generate token
     */
    @PostMapping("api/v1/auth/login")
    public ResponseEntity<ResponseBody> login(@RequestBody LoginRequestBody requestBody) {
        try {
            ResponseBody<String> responseBody = new ResponseBody();

            //validation
            //if user's username is null or it's empty(no value), then return status is bad request
            if (requestBody.getUsername() == null || requestBody.getUsername().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
            }

            //if user's password is null or it's empty(no value), then return status is bad request
            if (requestBody.getPassword() == null || requestBody.getPassword().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
            }

            User findOne = userService.getByUsername(requestBody.getUsername());
            //if user not exist, unauthorized
            if (findOne == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
            }
            //password not match, unauthorized
            if (!requestBody.getPassword().equals(findOne.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
            }

            //generate token
            String token = TokenHelper.GenerateToken(findOne.getUsername());
            responseBody.setResult(token);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            //server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /*
    Get User information
    1. get the token from header
    2. varify the token to to get the information from the token
    3. use the information to get the specific user
     */
    @GetMapping("api/v1/users/me")
    public ResponseEntity<ResponseBody> getMe(@RequestHeader("Authorization") String token) {
        try {
            ResponseBody<User> responseBody = new ResponseBody();
            String username = TokenHelper.VerifyToken(token);
            User findOne = userService.getByUsername(username);
            if (findOne == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
            }
            responseBody.setResult(findOne);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (SignatureException sEx) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
