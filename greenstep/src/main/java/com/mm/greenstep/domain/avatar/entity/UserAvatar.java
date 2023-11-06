package com.mm.greenstep.domain.avatar.entity;

import com.mm.greenstep.domain.user.entity.User;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "user_avatar")
public class UserAvatar {
    @Id
    @Column(name = "avatar_id")
    private Long avatarId;

    @ManyToOne
    @JoinColumn(name = "box_id")
    private Avatar avatar;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public void updateAvatar(Avatar avatar) {
        this.avatar = avatar;
    }
}