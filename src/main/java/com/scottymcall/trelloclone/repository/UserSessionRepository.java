package com.scottymcall.trelloclone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scottymcall.trelloclone.model.UserSession;

@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, Long>{

    
}
