package com.iso.exception;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.util.regex.Pattern;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iso.request.dto.ProjectRegistration;
import com.iso.response.ApiResponse;
import com.iso.util.ResponseBuilder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service

public class ProjectRegistrationService {
    private Logger logger = LoggerFactory.getLogger(getClass().getCanonicalName());
    private static final int BUFFER = 1024;
    private static final Pattern ALLOWED_CHARACTERS_PATTERN = Pattern
            .compile("^[0-9A-Za-z\\s\\-\\.\\,\\-\\@\\_\\&\\:\\;\\/]+$");

    public ApiResponse<ProjectRegistration> save(ProjectRegistration projectRegistration) {
        log.info("In save method of the ProjectRegistrationService class");

        validateData(projectRegistration); // Validate data before saving

        String excelFilePath = "";
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonData = mapper.writeValueAsString(projectRegistration);

            File file = new File("data_file.json");
            if (!file.exists()) {
                file.createNewFile();
            }
            FileWriter writer = new FileWriter(new File("data_file.json"));
            writer.write(jsonData);

            excelFilePath = saveDataToExcel(projectRegistration);

            log.info("Data written successfully in file");
        } catch (Exception ex) {
            log.info("Error occurred while saving data into file.");
            ex.printStackTrace();
            throw new RuntimeException("Operation performed failure");
        }
        return ResponseBuilder.getOkResponse("success", "" + excelFilePath, projectRegistration);
    }

    private void validateData(ProjectRegistration projectRegistration) {

        this.logger.info("--------> Start checking for disallowed characters in Registration form");
        StringBuilder invalidCharacters = new StringBuilder();

        checkInvalidCharacters(invalidCharacters, "Applicant_Reference", projectRegistration.getAppReference());
        checkInvalidCharacters(invalidCharacters, "First_Name", projectRegistration.getFname());
        checkInvalidCharacters(invalidCharacters, "Last_Name", projectRegistration.getLname());
        checkInvalidCharacters(invalidCharacters, "Job_Title", projectRegistration.getJtitle());
        checkInvalidCharacters(invalidCharacters, "Contact_Number", projectRegistration.getContNum());
        checkInvalidCharacters(invalidCharacters, "Official_Email", projectRegistration.getEmail());
        checkInvalidCharacters(invalidCharacters, "Company_Name", projectRegistration.getCompName());
        checkInvalidCharacters(invalidCharacters, "Company_Address", projectRegistration.getCompAddress());
        checkInvalidCharacters(invalidCharacters, "Post_Office", projectRegistration.getCompostoffice());
        checkInvalidCharacters(invalidCharacters, "State", projectRegistration.getState());
        checkInvalidCharacters(invalidCharacters, "City", projectRegistration.getDist());
        checkInvalidCharacters(invalidCharacters, "Pincode", String.valueOf(projectRegistration.getPincode()));
        checkInvalidCharacters(invalidCharacters, "DOA_Details", projectRegistration.getDoadetails());
        checkInvalidCharacters(invalidCharacters, "DOA_Validity", projectRegistration.getDoavalid());
        checkInvalidCharacters(invalidCharacters, "DOA_Scope", projectRegistration.getDoascope());
        checkInvalidCharacters(invalidCharacters, "POA_Details", projectRegistration.getPoadetails());
        checkInvalidCharacters(invalidCharacters, "POA_Validity", projectRegistration.getPoavalid());
        checkInvalidCharacters(invalidCharacters, "POA_Scope", projectRegistration.getPoascope());
        checkInvalidCharacters(invalidCharacters, "Project_Name", projectRegistration.getAirSys());
        checkInvalidCharacters(invalidCharacters, "Project_Details", projectRegistration.getProjDetail());
        checkInvalidCharacters(invalidCharacters, "Part_Number", projectRegistration.getPartnum());
        checkInvalidCharacters(invalidCharacters, "IMTAR_Sub_Part", projectRegistration.getImtar());
        checkInvalidCharacters(invalidCharacters, "Product_Breakdown_Structure_File_Name",
                projectRegistration.getCustomFile());

        if (invalidCharacters.length() > 0) {
            this.logger.error("--------> Error: Invalid data. Contains disallowed characters.");
            log.error("Invalid characters found: {}", invalidCharacters.toString());
            throw new IllegalArgumentException("Invalid data. Contains disallowed characters.");
        }
    }

    private void checkInvalidCharacters(StringBuilder invalidCharacters, String fieldName, String input) {
        if (input != null && !input.trim().isEmpty() && !isValidInput(input)) {
            invalidCharacters.append("Field: ").append(fieldName).append(", Invalid Characters: ");
            for (char c : input.toCharArray()) {
                if (!ALLOWED_CHARACTERS_PATTERN.matcher(String.valueOf(c)).matches()) {
                    invalidCharacters.append(c).append(" ");
                }
            }
            invalidCharacters.append("; ");
        }
    }

    private boolean isValidInput(String input) {
        return input != null && ALLOWED_CHARACTERS_PATTERN.matcher(input).matches();
    }

    // ******************************************************************************************************

    public String saveDataToExcel(ProjectRegistration projectRegistration) throws Exception {

        this.logger.error("--------> Save form data to excel file begin");
        String AppRef = projectRegistration.getAppReference();
        String DAID_DATE_Time = AppRef;
        DAID_DATE_Time = "R_" + DAID_DATE_Time.substring(DAID_DATE_Time.lastIndexOf("_") + 1); // This is used to save
                                                                                               // the excel file inside
                                                                                               // this folder
        String daid = DAID_DATE_Time.substring(DAID_DATE_Time.lastIndexOf("_") + 1);
        daid = daid.substring(0, 10); // extract daid from app ref;

        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet ws = workbook.createSheet("Project_Registration_Details");
        Row headerrow = ws.createRow((short) 0); // creating header header row
        headerrow.createCell(0).setCellValue("Applicant_Reference");
        headerrow.createCell(1).setCellValue("First_Name");
        headerrow.createCell(2).setCellValue("Last_Name");
        headerrow.createCell(3).setCellValue("Job_Title");
        headerrow.createCell(4).setCellValue("Contact_Number");
        headerrow.createCell(5).setCellValue("Official_Email");
        headerrow.createCell(6).setCellValue("Company_Name");
        headerrow.createCell(7).setCellValue("Company_Address");
        headerrow.createCell(8).setCellValue("Post_Office");
        headerrow.createCell(9).setCellValue("state");
        headerrow.createCell(10).setCellValue("City");
        headerrow.createCell(11).setCellValue("Pincode");
        headerrow.createCell(12).setCellValue("DOA_Details");
        headerrow.createCell(13).setCellValue("DOA_Validity");
        headerrow.createCell(14).setCellValue("DOA_Scope");
        headerrow.createCell(15).setCellValue("POA_Details");
        headerrow.createCell(16).setCellValue("POA_Validity");
        headerrow.createCell(17).setCellValue("POA_Scope");
        headerrow.createCell(18).setCellValue("Project_Name");
        headerrow.createCell(19).setCellValue("Project_Details");
        headerrow.createCell(20).setCellValue("Part_Number");
        headerrow.createCell(21).setCellValue("IMTAR_Sub_Part");
        headerrow.createCell(22).setCellValue("Product_Breakdown_Structure_File_Name");

        Row datarow = ws.createRow((short) 1); // creating row to store data
        datarow.createCell(0).setCellValue(projectRegistration.getAppReference());
        datarow.createCell(1).setCellValue(projectRegistration.getFname());
        datarow.createCell(2).setCellValue(projectRegistration.getLname());
        datarow.createCell(3).setCellValue(projectRegistration.getJtitle());
        datarow.createCell(4).setCellValue(projectRegistration.getContNum());
        datarow.createCell(5).setCellValue(projectRegistration.getEmail());
        datarow.createCell(6).setCellValue(projectRegistration.getCompName());
        datarow.createCell(7).setCellValue(projectRegistration.getCompAddress());
        datarow.createCell(8).setCellValue(projectRegistration.getCompostoffice());
        datarow.createCell(9).setCellValue(projectRegistration.getState());
        datarow.createCell(10).setCellValue(projectRegistration.getDist());
        datarow.createCell(11).setCellValue(String.valueOf(projectRegistration.getPincode()));
        datarow.createCell(12).setCellValue(projectRegistration.getDoadetails());
        datarow.createCell(13).setCellValue(projectRegistration.getDoavalid());
        datarow.createCell(14).setCellValue(projectRegistration.getDoascope());
        datarow.createCell(15).setCellValue(projectRegistration.getPoadetails());
        datarow.createCell(16).setCellValue(projectRegistration.getPoavalid());
        datarow.createCell(17).setCellValue(projectRegistration.getPoascope());
        datarow.createCell(18).setCellValue(projectRegistration.getAirSys());
        datarow.createCell(19).setCellValue(projectRegistration.getProjDetail());
        datarow.createCell(20).setCellValue(projectRegistration.getPartnum());
        datarow.createCell(21).setCellValue(projectRegistration.getImtar());
        datarow.createCell(22).setCellValue(projectRegistration.getCustomFile());

        File currentDirFile = new File(".");
        String helper = currentDirFile.getAbsolutePath();
        System.out.println("path-" + helper);
        String parentFolder = helper.substring(0, helper.length() - 1);
        System.out.println("parentFolder-" + parentFolder);
        String filePath = "/" + parentFolder + "/" + "temp/" + "R_" + daid + "/";
        File file = new File(filePath);
        if (!file.exists())
            file.mkdirs();

        String excelFilePath = filePath + AppRef + ".xlsx";
        FileOutputStream os = new FileOutputStream(excelFilePath);
        workbook.write(os);
        this.logger.error("--------> Data saved to excel file completed successfully");
        return excelFilePath;
    }

}
