package com.example.prodytalk.contoller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.prodytalk.service.RecruitService;
import com.example.prodytalk.vo.RecruitVO;

import lombok.RequiredArgsConstructor;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class RecruitController {
    private RecruitService recruitService;

    @GetMapping("/recruit")
    public List<RecruitVO> getAllRecruits(Integer recruit_id) {
        return recruitService.findAllRecruits(recruit_id);
    }

    @GetMapping("/recruit/study")
    public List<RecruitVO> getStudyRecruits(Integer recruit_id) {
        return recruitService.findStudyRecruits(recruit_id);
    }

    @GetMapping("/recruit/project")
    public List<RecruitVO> getProjectRecruits(Integer recruit_id) {
        return recruitService.findProjectRecruits(recruit_id);
    }

    @PostMapping("/recruit")
    public void createRecruit(@RequestBody RecruitVO recruit) {

        // 어떤 유저가 게시글 작성하는 건지 token을 이용해 user_id 알아내기
        // String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer
        // ".length());
        // String user_id =
        // Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody().get("id",String.class);
        // System.out.println(recruit.getRecruit_id() + " "+ user_id);

        recruitService.addRecruit(recruit);
    }

    @GetMapping("/recruit/{recruit_id}")
    public ResponseEntity<RecruitVO> getRecruitByNo(@PathVariable Integer recruit_id) {
        return recruitService.findRecruitById(recruit_id);
    }

    @PostMapping("/recruit/update")
    public void updateRecruitByNo(@RequestBody RecruitVO recruit) {
        recruitService.modfiyRecruit(recruit);
    }

    @PostMapping("/recruit/delete")
    public void deleteRecruitByNo(@RequestBody RecruitVO recruit) {
        recruitService.deleteRecruit(recruit);
    }
}
