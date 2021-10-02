package com.ucareer.backend.users;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ucareer.backend.landings.Landings;
import com.ucareer.backend.menuItems.MenuItem;
import jdk.jfr.Timestamp;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;


import javax.persistence.*;
import java.util.Date;

import static javax.persistence.TemporalType.TIMESTAMP;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String username;
    private String email;
    private String status;
    private String first_name;
    private String last_name;
    private String address;
    private String middle_name;
    private String confirm_password;

    @Temporal(TIMESTAMP)
    @LastModifiedDate
    @UpdateTimestamp
    private Date modified_at;

    @Temporal(TIMESTAMP)
    @CreatedDate
    @CreationTimestamp
    private Date created_at;

    @OneToOne
    @JoinColumn(name = "landing_id")
    private Landings landings;


    public Long getId()
    {
        return id;
    }
    public void setId(Long id)
    {
        this.id = id;
    }


    public String getUsername()
    {
        return username;
    }
    public void setUsername(String username)
    {
        this.username = username;
    }


    public String getPassword()
    {
        return password;
    }
    public void setPassword(String password)
    {
        this.password = password;
    }


    public String getEmail()
    {
        return email;
    }
    public void setEmail(String email)
    {
        this.email = email;
    }


    public String getStatus()
    {
        return status;
    }
    public void setStatus(String status)
    {
        this.status = status;
    }


    public Date getModified_at()
    {
        return modified_at;
    }
    public void setModified_at(Date modifiedAt)
    {
        this.modified_at = modifiedAt;
    }


    public Date getCreated_at()
    {
        return created_at;
    }
    public void setCreated_at(Date createdAt)
    {
        this.created_at = createdAt;
    }

    public String getFirst_name() {
        return first_name;
    }
    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }


    public String getLast_name() {
        return last_name;
    }
    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }


    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }


    public String getMiddle_name() {
        return middle_name;
    }

    public void setMiddle_name(String middle_name) {
        this.middle_name = middle_name;
    }

    public String getConfirm_password() {
        return confirm_password;
    }

    public void setConfirm_password(String confirm_password) {
        this.confirm_password = confirm_password;
    }
}
