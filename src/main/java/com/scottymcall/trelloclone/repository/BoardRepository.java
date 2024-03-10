package com.scottymcall.trelloclone.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.scottymcall.trelloclone.model.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
}
