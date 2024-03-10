package com.scottymcall.trelloclone.controller;

import com.scottymcall.trelloclone.model.Board;
import com.scottymcall.trelloclone.model.Lane;
import com.scottymcall.trelloclone.repository.BoardRepository;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardRepository boardRepository;

    public BoardController(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    // Create a new board
    @PostMapping
    public Board createBoard(@RequestBody @NonNull Board board) {
        // Set the board of each lane
        for (Lane lane : board.getLanes()) {
            lane.setBoard(board);
        }

        return boardRepository.save(board);
    }

    // Retrieve all boards
    @GetMapping
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    // Retrieve a board by id
    @GetMapping("/{id}")
    public Board getBoardById(@PathVariable @NonNull Long id) {
        return boardRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Board not found"));
    }

    // Update a board
    @PutMapping("/{id}")
    public Board updateBoard(@PathVariable @NonNull Long id, @RequestBody Board board) {
        return boardRepository.findById(id)
        .map(existingBoard -> {
            // Remove lanes that aren't in the new list
            existingBoard.getLanes().removeIf(existingLane -> board.getLanes().stream()
                .noneMatch(newLane -> newLane.getTitle().equals(existingLane.getTitle())));

            // Add new lanes that aren't in the existing list
            for (Lane newLane : board.getLanes()) {
                if (existingBoard.getLanes().stream()
                    .noneMatch(existingLane -> existingLane.getTitle().equals(newLane.getTitle()))) {
                    newLane.setBoard(existingBoard);
                    existingBoard.getLanes().add(newLane);
                }
            }

            existingBoard.setTitle(board.getTitle());
            return boardRepository.save(existingBoard);
        })
        .orElseThrow(() -> new RuntimeException("Board not found"));
    }

    // Delete a board
    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable @NonNull Long id) {
        boardRepository.deleteById(id);
    }
}