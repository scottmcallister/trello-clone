package com.scottymcall.trelloclone.controller;

import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import com.scottymcall.trelloclone.model.Post;
import com.scottymcall.trelloclone.repository.PostRepository;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @PostMapping
    public Post createPost(@RequestBody @NonNull Post post) {
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
            return postRepository.save(existingPost);
        })
        .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable @NonNull Long id) {
        postRepository.deleteById(id);
    }
}
