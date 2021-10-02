package com.ucareer.backend.heads;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.TemporalType.TIMESTAMP;

@Entity
public class Head {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String img_url;
    private String status;

    @Temporal(TIMESTAMP)
    @CreatedDate
    @CreationTimestamp
    private Date created_at;

    @Temporal(TIMESTAMP)
    @LastModifiedDate
    @UpdateTimestamp
    private Date modified_at;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }


    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }


    public String getImg_url() {
        return img_url;
    }
    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }


    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }


    public Date getCreated_at() {
        return created_at;
    }
    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }


    public Date getModified_at() {
        return modified_at;
    }
    public void setModified_at(Date modified_at) {
        this.modified_at = modified_at;
    }

}
