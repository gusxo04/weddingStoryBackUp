package kr.co.iei.convention.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="conventionComment")
public class ConventionCommentDTO {

    private int conventionCommentNo;
    private int memberNo;
    private int conventionNo;
    private String conventionCommentContent;
    private int editType;
    private String conventionCommentDate;
    private int conventionCommentRef;

}
