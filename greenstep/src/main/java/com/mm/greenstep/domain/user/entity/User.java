package com.mm.greenstep.domain.user.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User implements UserDetails {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "nickname")
    private String nickName;

    @Column(name = "exp", nullable = false)
    private Integer exp;

    @Column(name = "password")
    private String password;

    @Column(name = "kakao_id")
    private String userName;

    @Column(name = "level")
    private Integer level;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDate.now(); // 저장하기 전에 현재 시간으로 초기화
        this.exp = 0;
        this.isDeleted = false;
        this.level = 1;
    }




    // 아래부터 UserDetail부분


    // @ElementCollection
    // 별도의 엔티티가 아닌 값의 컬렉션을 매핑할 때 사용됩니다.
    // JPA는 이를 위해 별도의 테이블을 생성함
    @Column
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public void levelUp(Integer exp) {
        this.level++;
        this.exp = exp;
    }



}
