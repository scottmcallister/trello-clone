package com.scottymcall.trelloclone.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.scottymcall.trelloclone.model.Board;
import com.scottymcall.trelloclone.model.Lane;
import com.scottymcall.trelloclone.repository.BoardRepository;
import com.scottymcall.trelloclone.repository.LaneRepository;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/lanes")
public class LaneController {
    
    private final LaneRepository laneRepository;
    private final BoardRepository boardRepository;

    public LaneController(LaneRepository laneRepository, BoardRepository boardRepository) {
        this.laneRepository = laneRepository;
        this.boardRepository = boardRepository;
    }

    @PostMapping
    public Lane createLane(@RequestBody @NonNull Lane lane, @RequestParam @NonNull Long boardId) {
        Board board = boardRepository.findById(boardId)
            .orElseThrow(() -> new RuntimeException("Board not found"));
        lane.setBoard(board);
        return laneRepository.save(lane);
    }

    @GetMapping
    public List<Lane> getAllLanes() {
        return laneRepository.findAll();
    }

    @GetMapping("/{id}")
    public Lane getLaneById(@PathVariable @NonNull Long id) {
        return laneRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Lane not found"));
    }

    @PutMapping("/{id}")
    public Lane updateLane(@PathVariable @NonNull Long id, @RequestBody Lane lane) {
        return laneRepository.findById(id)
        .map(existingLane -> {
            existingLane.setPosts(lane.getPosts());
            existingLane.setTitle(lane.getTitle());
            return laneRepository.save(existingLane);
        })
        .orElseThrow(() -> new RuntimeException("Lane not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteLane(@PathVariable @NonNull Long id) {
        laneRepository.deleteById(id);
    }
}
