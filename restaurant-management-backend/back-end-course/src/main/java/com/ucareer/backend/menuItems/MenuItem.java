package com.ucareer.backend.menuItems;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.TemporalType.TIMESTAMP;

@Entity
@Table(name = "menuItem")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String picture;
    private String name;
    private String introduction;
    private String price;
    private String landing_id;

    public String getLanding_id() {
        return landing_id;
    }

    public void setLanding_id(String landing_id) {
        this.landing_id = landing_id;
    }

    @Temporal(TIMESTAMP)
    @LastModifiedDate
    @UpdateTimestamp
    private Date modified_at;

    @Temporal(TIMESTAMP)
    @CreatedDate
    @CreationTimestamp
    private Date created_at;

    public Long getId() {
        return id;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Date getModified_at() {
        return modified_at;
    }

    public void setModified_at(Date modified_at) {
        this.modified_at = modified_at;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }
}
