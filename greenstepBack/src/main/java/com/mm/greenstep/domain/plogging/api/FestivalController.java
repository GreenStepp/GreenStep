package com.mm.greenstep.domain.plogging.api;

import com.mm.greenstep.domain.plogging.dto.response.getFestivalResDto;
import com.mm.greenstep.domain.plogging.service.FestivalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/festival")
@RequiredArgsConstructor
public class FestivalController {
    private final FestivalService festivalService;

    @GetMapping
    public ResponseEntity<?> getFestivalInfo() {
        List<getFestivalResDto> festivalList = festivalService.getFestivalInfo();
        return new ResponseEntity<>(festivalList, HttpStatus.OK);
    }
}
