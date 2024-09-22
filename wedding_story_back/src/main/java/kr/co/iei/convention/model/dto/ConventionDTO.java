package kr.co.iei.convention.model.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "convention")
public class ConventionDTO {

    private int conventionNo;
    private String conventionTitle;
    private String conventionContent;
    private String conventionImg;
    private Date conventionStart;
    private Date conventionEnd;
    private String conventionTime;
    private Date conventionRegisteredDate;
    private int conventionPrice;
    private int conventionLimit;
    private int imgStyle;
}
