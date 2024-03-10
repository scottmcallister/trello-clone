package com.scottymcall.trelloclone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.scottymcall.trelloclone.model.Lane;

@Repository
public interface LaneRepository extends JpaRepository<Lane, Long>{
}
