package com.mm.greenstep.domain.user.repository;

import com.mm.greenstep.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserId(Long user_pk);

    boolean existsByUserName(String userName);

    Optional<User> findByUserName(String userName);
}