package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.service.RecruitService;
import com.example.ProdyTalk.vo.RecruitVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
public class RecruitController {

    @Autowired
    private RecruitService recruitService;

    // get all recruit
    @GetMapping("/recruit")
    public List<RecruitVO> getAllRecruits() {
        return recruitService.getAllRecruit();
    }

    @PostMapping("/recruit")
    public void createRecruit(@RequestBody RecruitVO recruit) {
        recruitService.createRecruit(recruit);
    }

    // get one recruit
    @GetMapping("/recruit/{recruit_id}")
    public ResponseEntity<RecruitVO> getRecruitByNo(@PathVariable Integer recruit_id) {
        return recruitService.getRecruit(recruit_id);
    }

    // update recruit
    @PostMapping("/recruit/update")
    public void updateRecruitByNo(@RequestBody RecruitVO recruit) {
        recruitService.updateRecruit(recruit);
    }

    @PostMapping("/recruit/delete")
    public void deleteRecruitByNo(@RequestBody RecruitVO recruit) {
        recruitService.deleteRecruitByNo(recruit);
    }
}
