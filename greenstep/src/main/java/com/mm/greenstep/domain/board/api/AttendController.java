package com.mm.greenstep.domain.board.api;

import com.mm.greenstep.domain.board.service.AttendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/attend")
@RequiredArgsConstructor
public class AttendController {
    private final AttendService attendService;

    @GetMapping("/{boardId}")
    public ResponseEntity<?> createattend(@PathVariable Long boardId){
        return attendService.createattend(boardId);
    }

    @GetMapping("/leave/{boardId}")
    public ResponseEntity<?> deleteattend(@PathVariable Long boardId){
        return attendService.deleteattend(boardId);
    }

    @GetMapping("/attendList/{boardId}")
    public ResponseEntity<?> getAllattend(@PathVariable Long boardId){
        return attendService.getAllattend(boardId);
    }

}
