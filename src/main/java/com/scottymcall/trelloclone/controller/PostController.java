package com.scottymcall.trelloclone.controller;

import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import com.scottymcall.trelloclone.model.Lane;
import com.scottymcall.trelloclone.model.Post;
import com.scottymcall.trelloclone.repository.PostRepository;
import com.scottymcall.trelloclone.repository.LaneRepository;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostRepository postRepository;
    private final LaneRepository laneRepository;

    public PostController(PostRepository postRepository, LaneRepository laneRepository) {
        this.postRepository = postRepository;
        this.laneRepository = laneRepository;
    }

    @PostMapping
    public Post createPost(@RequestBody @NonNull Post post, @RequestParam @NonNull Long laneId) {
        Lane lane = laneRepository.findById(laneId)
            .orElseThrow(() -> new RuntimeException("Lane not found"));
        post.setLane(lane);
        return postRepository.save(post);
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable @NonNull Long id) {
        return postRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    @PutMapping("/{id}")
    public Post updatePost(@PathVariable @NonNull Long id, @RequestBody Post post) {
        return postRepository.findById(id)
        .map(existingPost -> {
            existingPost.setContent(post.getContent());
            existingPost.setAuthor(post.getAuthor());
            existingPost.setImageUrl(post.getImageUrl());
            return postRepository.save(existingPost);
        })
        .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable @NonNull Long id) {
        postRepository.deleteById(id);
    }
}
