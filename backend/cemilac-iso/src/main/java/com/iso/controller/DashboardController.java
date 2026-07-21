/*Designed & Developed By----> Name: Mrinal Singh  */
//  mvn clean package -DskipTests -Dformatter.skip=true  Command to Build the Project
package com.iso.controller;

import iso.NativeInterface;
import iso.NativeInterfaceConfig;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.util.FileSystemUtils;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.compress.archivers.tar.TarArchiveOutputStream;
import java.io.BufferedWriter;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.tools.tar.TarEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.iso.constants.DownloadFileStatus;
import com.iso.constants.UploadFileStatus;
import com.iso.response.CertificateNameDTO;
import com.iso.response.CityFileDTO;
import com.iso.response.DashboardDataDTO;
import com.iso.response.DocHistoryDTO;
import com.iso.response.DownloadRegistFormDataDTO;
import com.iso.response.HeaderDataDTO;
import com.iso.response.InfectedFileListDTO;
import com.iso.response.ObservationDownloadPendingDTO;
import com.iso.response.ObservationForUploadPageDTO;
import com.iso.response.RejectedProjectDTO;
import com.iso.response.StatusFileDTO;
import com.iso.response.observationFileDTO;
import com.iso.response.stateFileDTO;
import com.iso.util.FileValidator;
import com.iso.util.MasterData;
import com.iso.util.Utility;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;

@RestController
@RequestMapping({ "api/v1/" })
@WebListener
@CrossOrigin(origins = "http://localhost:3000")
// @Slf4j
public class DashboardController implements HttpSessionListener {

    @Value("${download.location}")
    private String downloadlocation;

    private int maxiteration = 1;
    private int dynamiccallcheck = 0;
    private int certFlag = 0;
    private List<File> tarfile = new ArrayList<>();
    private List<String> downloadedProjectIDList = new ArrayList<>();
    private List<File> dynamiccorruptlist = new ArrayList<>();
    private String staticfolderid = "";
    private Logger logger = LoggerFactory.getLogger(getClass().getCanonicalName());
    private String checkConnectionStatus;
    static String DA_ID = "";
    static String logstat = "false";
    private String daid = "";
    private String daname = "";
    private String id_for_staticfolder = "";
    private String idforfolder = "";

    @GetMapping({ "/", "pressBackButtonLogout" })
    protected void pressBackButtonLogout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {

        File directory = new File(downloadlocation);
        File[] fileList = directory.listFiles();

        DA_ID = Utility.getDAID("STATIC", fileList);

        if (Utility.isValid(DA_ID) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return;
        }
        try (InputStream fileinputstream = new FileInputStream(downloadlocation + DA_ID + "_STATIC/sys.out");
                XSSFWorkbook work = new XSSFWorkbook(fileinputstream)) {

            if (readObservationFile().isEmpty()) {

                Sheet ws = work.getSheetAt(0);
                if (ws == null)
                    return;

                Cell cell = null;
                cell = ws.getRow(1).getCell(0);
                if (cell == null)
                    return;
                cell.setCellValue("No");

                try (FileOutputStream os = new FileOutputStream(downloadlocation + DA_ID + "_STATIC/sys.out")) {

                    work.write(os);

                    downloadedProjectIDList.clear();
                    HttpSession session = se.getSession();
                    dynamiccallcheck = 0;
                    session.invalidate();
                } catch (Exception e) {

                    e.printStackTrace();
                } finally {

                    Utility.deleteFile(downloadlocation + DA_ID + "_STATIC/downloadstatus.xlsx");
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        } finally {
            tarfile.clear();

        }

    }

    // ************************* display DAID and DAName
    // *****************************************************************
    public List<HeaderDataDTO> daidnamedata() throws Exception {

        String folderNameContains = "STATIC";
        String searchDirectory = downloadlocation;
        List<HeaderDataDTO> headerDataList = new ArrayList<>();
        File directory = new File(searchDirectory);

        if (Utility.isValid(directory.getName()) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return headerDataList;
        }
        File[] fileList = directory.listFiles();

        id_for_staticfolder = Utility.getDAID(folderNameContains, fileList);

        if (Utility.isValid(id_for_staticfolder) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return headerDataList;
        }

        String status_file_location = id_for_staticfolder + "_STATIC/";

        if (Utility.isValid(status_file_location) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return headerDataList;
        }

        // String status_file_location = "0000000001_STATIC/";
        String fileName = downloadlocation + status_file_location + "status.xlsx";

        if (Utility.fileExists(fileName)) {

            boolean isRowBlank = true;
            try (FileInputStream excelFile = new FileInputStream(new File(fileName));) {
                XSSFWorkbook workbook = new XSSFWorkbook(excelFile);
                if (workbook == null) {

                    return headerDataList;
                }

                XSSFSheet worksheet = workbook.getSheetAt(0);
                if (worksheet == null) {

                    return headerDataList;
                }

                XSSFRow row = worksheet.getRow(1);

                HeaderDataDTO invalidData = new HeaderDataDTO();

                if (Utility.isValid(String.valueOf(row.getCell(0))) == false
                        || Utility.isValid(String.valueOf(row.getCell(1))) == false) {
                    headerDataList.clear();
                    headerDataList.add(invalidData);

                    return headerDataList;
                }

                HeaderDataDTO headerDataDTO = new HeaderDataDTO();
                isRowBlank = true;

                String row0 = String.valueOf(row.getCell(0));

                if (row0 != null && row0 != "" && row0 != null) {
                    headerDataDTO.setDaid(row0);

                    DA_ID = row0;

                    isRowBlank = false;

                }
                if (String.valueOf(row.getCell(1)) != null) {

                    headerDataDTO.setDaname(String.valueOf(row.getCell(1)));

                }
                if (!isRowBlank)
                    headerDataList.add(headerDataDTO);

            } catch (Exception ex) {
                ex.printStackTrace();
            }

            return headerDataList;
        } else
            return headerDataList;

    }

    // ****************************************************************************************************************

    @GetMapping({ "/", "rejected-projects" })
    public ModelAndView rejectedProjects(HttpServletRequest req, HttpServletResponse res) throws Exception {
        String page = "rejected-projects";
        ModelAndView mv = new ModelAndView(page);

        List<RejectedProjectDTO> listOfRejectedProjects = rejectedProjectDetails();

        if (listOfRejectedProjects == null || listOfRejectedProjects.isEmpty()) {
            mv.addObject("rejectedprojlist", "Empty");
        } else {
            mv.addObject("rejectedprojlist", listOfRejectedProjects);
        }
        return mv;
    }

    // ********************************* Rejected Project
    // *****************************************//

    public List<RejectedProjectDTO> rejectedProjectDetails() throws Exception {

        this.logger.info("--------> Starting Process for Rejected Project Details");
        List<RejectedProjectDTO> rejectedProjectList = new ArrayList<>();
        String status_file_location = id_for_staticfolder + "_STATIC/";

        String fileName = downloadlocation + status_file_location + "status.xlsx";

        if (Utility.isValid(fileName) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return rejectedProjectList;
        }
        if (Utility.fileExists(fileName)) {
            FileInputStream excelFile = new FileInputStream(new File(fileName));
            XSSFWorkbook workbook = new XSSFWorkbook(excelFile);

            try {

                Sheet worksheet = workbook.getSheetAt(0);
                if (worksheet == null) {
                    this.logger.error("--------> Worksheet is Empty");
                    return rejectedProjectList;
                }
                this.logger.info("--------> Reading Status file to get the details of Rejected Projects");
                for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
                    Row row = worksheet.getRow(i);
                    if (row == null) {
                        this.logger.error("-------->Empty row found is excel file");
                        return rejectedProjectList;
                    }

                    RejectedProjectDTO rejectedprojdto = new RejectedProjectDTO();

                    RejectedProjectDTO invalidData = new RejectedProjectDTO();

                    if (Utility.isValid(String.valueOf(row.getCell(3))) == false
                            || Utility.isValid(String.valueOf(row.getCell(4))) == false
                            || Utility.isValid(String.valueOf(row.getCell(5))) == false
                            || Utility.isValid(String.valueOf(row.getCell(6))) == false) {
                        rejectedProjectList.clear();
                        rejectedProjectList.add(invalidData);
                        return rejectedProjectList;
                    }

                    String projStatusCellVal = String.valueOf(row.getCell(5));
                    if (projStatusCellVal != null && projStatusCellVal.equalsIgnoreCase("Rejected")) {
                        rejectedprojdto.setPartNumber(String.valueOf(row.getCell(3)));
                        rejectedprojdto.setProjName(String.valueOf(row.getCell(4)));
                        rejectedprojdto.setProjStatus(String.valueOf(row.getCell(5)));
                        rejectedprojdto.setRemarks(String.valueOf(row.getCell(6)));

                        rejectedProjectList.add(rejectedprojdto);
                    }

                }
            } catch (Exception ex) {
                this.logger.error("--------> Exception while readind the Status file" + ex);
                ex.printStackTrace();
            } finally {
                workbook.close();
                excelFile.close();
            }

        }
        this.logger.info("-------->Rejected Projects function ends " + rejectedProjectList);
        return rejectedProjectList;

    }

    // ***********************************Code Ends******************************************//

    @GetMapping({ "/", "project-details" })
    public ModelAndView projectDetails(HttpServletRequest req, HttpServletResponse res) throws Exception {

        HttpSession session = req.getSession();
        session.setMaxInactiveInterval(1800); // 10 seconds session timeout

        String page = "";
        String username = (String) req.getSession().getAttribute("userName");

        if (username == null) {
            page = "login";
            // session.invalidate();
        } else
            page = "project-details";

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("ddMMyyyyHHmmss");
        ZonedDateTime now = ZonedDateTime.now();
        String datetime = dtf.format(now);

        idforfolder = daid + datetime;
        daid = "DA_" + daid + datetime;

        ModelAndView mv = new ModelAndView(page);
        List<DashboardDataDTO> dashboardDataList = dashboarddatareadXLSX();
        List<InfectedFileListDTO> infectedFileList = infectedFileList(tarfile);

        boolean containsInvalid = dashboardDataList.stream()
                .anyMatch(dashboardData -> "invalid".equals(dashboardData.getProjectID()));

        if (containsInvalid) {
            this.logger.info("--------> Status.xlx file contains invalid characters.");
            mv.addObject("dashboarddataList", dashboardDataList);
        } else {
            if (dashboardDataList == null || dashboardDataList.isEmpty()) {
                mv.addObject("dashboarddataList", "Empty");
            } else {
                mv.addObject("dashboarddataList", dashboardDataList);
            }

            if (infectedFileList.size() > 0) {

                mv.addObject("infectedfilelist", infectedFileList);
            } else
                mv.addObject("infectedfilelist", "Empty");

            mv.addObject("HeaderDataDTO", daidnamedata());

            if (dynamiccorruptlist.size() > 0)
                mv.addObject("dynamiccorrupt", dynamiccorruptlist);
            else
                mv.addObject("dynamiccorrupt", "Empty");

            mv.addObject("idList", downloadedProjectIDList);

            List<RejectedProjectDTO> listOfRejectedProjects = rejectedProjectDetails();

            if (listOfRejectedProjects == null || listOfRejectedProjects.isEmpty()) {
                mv.addObject("rejectedprojlist", "Empty");
            } else {
                mv.addObject("rejectedprojlist", "Not");
            }

        }

        return mv;
    }

    // ************************* display data on dashboard by using excel file
    // ****************************************

    public List<DashboardDataDTO> dashboarddatareadXLSX() throws IOException {

        this.logger.info("--------> Starting Process for Dashboard Data Details");

        List<DashboardDataDTO> dashboardDataList = new ArrayList<>();
        String status_file_location = "";
        status_file_location = id_for_staticfolder + "_STATIC/";

        String fileName = downloadlocation + status_file_location + "status.xlsx";

        if (Utility.isValid(fileName) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return dashboardDataList;
        }
        if (Utility.fileExists(fileName)) {
            FileInputStream excelFile = new FileInputStream(new File(fileName));

            XSSFWorkbook workbook = new XSSFWorkbook(excelFile);
            if (workbook == null) {
                this.logger.error("--------> Excel workbook is empty");
                return dashboardDataList;
            }
            boolean isRowBlank = true;
            try {
                this.logger.info("--------> Reading Status.xlsx file to get all the data ");
                XSSFSheet worksheet = workbook.getSheetAt(0);
                if (worksheet == null) {
                    this.logger.error("--------> Excel worksheet found empty");
                    return dashboardDataList;
                }
                for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
                    XSSFRow row = worksheet.getRow(i);
                    DashboardDataDTO dashboardFileDTO = new DashboardDataDTO();
                    DashboardDataDTO invalidData = new DashboardDataDTO("invalid", "invalid", "invalid", "invalid");
                    isRowBlank = true;
                    if (Utility.isValid(String.valueOf(row.getCell(2))) == false
                            || Utility.isValid(String.valueOf(row.getCell(3))) == false
                            || Utility.isValid(String.valueOf(row.getCell(4))) == false
                            || Utility.isValid(String.valueOf(row.getCell(5))) == false) {

                        this.logger.info("--------> excel file contains invalid characters");
                        dashboardDataList.clear();
                        dashboardDataList.add(invalidData);
                        return dashboardDataList;
                    }

                    if (String.valueOf(row.getCell(2)) != null || String.valueOf(row.getCell(2)) != " "
                            || String.valueOf(row.getCell(2)) != "") {

                        dashboardFileDTO.setProjectID(String.valueOf(row.getCell(2)));
                        isRowBlank = false;
                    }
                    if (String.valueOf(row.getCell(3)) != null) {
                        dashboardFileDTO.setProjectPartNumber(String.valueOf(row.getCell(3)));
                        isRowBlank = false;

                    }
                    if (String.valueOf(row.getCell(4)) != null) {
                        dashboardFileDTO.setProjectName(String.valueOf(row.getCell(4)));
                        isRowBlank = false;

                    }
                    if (String.valueOf(row.getCell(5)) != null) {
                        dashboardFileDTO.setStatus(String.valueOf(row.getCell(5)));
                        isRowBlank = false;

                    }

                    if (!isRowBlank)
                        dashboardDataList.add(dashboardFileDTO);
                }
                this.logger.info("--------> File reading Successfull");
            } catch (Exception ex) {
                ex.printStackTrace();
                this.logger.error("--------> Exception while reading the file");
            } finally {
                workbook.close();
                excelFile.close();

            }

            return dashboardDataList;
        } else {
            return dashboardDataList;
        }

    }

    // *****************************************************************************************************//

    @GetMapping({ "logoutsuccess" })
    public ModelAndView logoutsuccess() throws IOException {

        String page = "logoutsuccess";
        ModelAndView mv = new ModelAndView(page);

        return mv;

    }

    @GetMapping({ "project-registration" })
    public ModelAndView projectRegistration(HttpServletRequest req) throws Exception {

        HttpSession session = req.getSession();
        session.setMaxInactiveInterval(1800);

        String page = "";
        String username = (String) req.getSession().getAttribute("userName");
        if (username == null)
            page = "login";
        else
            page = "project-registration";
        ModelAndView mv = new ModelAndView(page);
        String status_file_location = id_for_staticfolder + "_STATIC/";
        String fileName = downloadlocation + status_file_location + "status.xlsx";

        if (Utility.isValid(fileName) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return mv;
        }
        if (Utility.fileExists(fileName)) {
            FileInputStream excelFile = new FileInputStream(new File(fileName));

            XSSFWorkbook workbook = new XSSFWorkbook(excelFile);
            try {
                XSSFSheet worksheet = workbook.getSheetAt(0);
                XSSFRow row = worksheet.getRow(1);

                if (Utility.isValid(String.valueOf(row.getCell(0))) == false
                        || Utility.isValid(String.valueOf(row.getCell(1))) == false) {

                    return mv;
                }

                String row0 = String.valueOf(row.getCell(0));

                if (row0 != null && row0 != "") {
                    daid = row0;
                    daname = String.valueOf(row.getCell(1));
                }
            }

            catch (Exception ex) {
                ex.printStackTrace();
            } finally {
                workbook.close();
                excelFile.close();

            }
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("ddMMyyyyHHmmss");
            ZonedDateTime now = ZonedDateTime.now();
            String datetime = dtf.format(now);
            id_for_staticfolder = daid;
            idforfolder = daid + datetime;
            daid = "DA_" + daid + datetime;

        }

        mv.addObject("state_list", stateList());
        mv.addObject("DAID", daid);
        mv.addObject("DANAME", daname);

        mv.addObject("HeaderDataDTO", daidnamedata());

        return mv;
    }

    @Autowired

    public List<stateFileDTO> stateList() throws Exception {
        List<stateFileDTO> statelist = new ArrayList<>();
        MasterData.getStateList().forEach(stateData -> {
            stateFileDTO statefiledto = new stateFileDTO();
            String strData[] = stateData.split("\\,");
            statefiledto.setStateID((strData[0]));
            statefiledto.setStateName(strData[1]);
            statelist.add(statefiledto);

        });
        return statelist;

    }

    // *****************************get city list ************************
    @GetMapping({ "getCityList" })
    public List<CityFileDTO> getCityList(@RequestParam("stateID") String stateID) throws Exception {
        List<CityFileDTO> citylist = new ArrayList<>();
        MasterData.getDistrictList().forEach(districtData -> {
            CityFileDTO cityfiledto = new CityFileDTO();
            String strData[] = districtData.split("\\,");

            if (stateID.equalsIgnoreCase(strData[2])) {
                cityfiledto.setCityID(strData[2]);
                cityfiledto.setCityName(strData[1]);
                citylist.add(cityfiledto);
            }

        });
        Collections.sort(citylist, Comparator.comparing(CityFileDTO::getCityName));
        return citylist;
    }

    String projectIDAppMatrix = "";

    @PostMapping("/upload")
    public ModelAndView upload(@RequestParam("projectid") String projectID, HttpServletRequest req) throws Exception {

        System.err.println();

        HttpSession session = req.getSession();
        session.setMaxInactiveInterval(1800);
        projectIDAppMatrix = projectID;

        String page = "";
        String username = (String) req.getSession().getAttribute("userName");
        if (username == null)
            page = "login";
        else
            page = "upload";

        ModelAndView mv = new ModelAndView(page);

        mv.addObject("observationfilelist", ObservationListForUploadPage(tarfile));

        mv.addObject("HeaderDataDTO", daidnamedata());

        List<StatusFileDTO> readexcel = readXLSX(projectID);

        if (!readexcel.isEmpty()) {

            boolean containsInvalid = readexcel.stream()
                    .anyMatch(dashboardData -> "invalid".equals(dashboardData.getDocName()));

            if (containsInvalid) {
                this.logger.info("--------> Applicability matrix document file contains invalid characters.");
                mv.addObject("statusList", readexcel);
            } else {
                if (readexcel.isEmpty()) {

                    mv.addObject("statusList", "Empty");
                } else {
                    mv.addObject("statusList", readexcel);
                }
                if (certificateList().isEmpty()) {
                    mv.addObject("Checkcertificate", "yes");
                } else
                    mv.addObject("Checkcertificate", "no");

                if (maxiteration > 1) {
                    mv.addObject("totaliter", maxiteration);

                }
            }
        }
        return mv;
    }

    // *************************************** Get list of observation files
    // ************************************************
    public List<observationFileDTO> ObservationFileList(List<File> tarlist) throws Exception {

        this.logger.info("--------> Starting Process for Observation");
        List<DashboardDataDTO> list = dashboarddatareadXLSX();
        List<String> projectIDList = new ArrayList<>();
        for (DashboardDataDTO dashboardDataDTO : list) {

            projectIDList.add(dashboardDataDTO.getProjectID()); // list of all project id available for DA
        }

        String foldername[] = new String[100];
        File folder = null;
        List<observationFileDTO> folderNameslist = new ArrayList<>();

        List<File> allfolder = tarlist;

        this.logger
                .info("--------> Reading Dynamic folder to get the list of all the Observation Received from CEMILAC");
        for (File folname : allfolder) {

            if (Utility.isValid(folname.getName()) == false) {
                this.logger.info("--------> file name contains invalid characters");
                return folderNameslist;
            }

            if (folname.getName().contains("Dynamic")) {
                String name = folname.getName();
                name = name.substring(0, name.lastIndexOf("."));

                int i = 0;
                for (String idlist : projectIDList) {
                    String app_matrix_file = downloadlocation + name + "/" + idlist + "/";

                    folder = new File(app_matrix_file);

                    if (folder.isDirectory()) {
                        File[] files = folder.listFiles();

                        for (File file : files) {
                            observationFileDTO obserfileDTO = new observationFileDTO();
                            if (file.isDirectory()) {
                                if (file.getName().contains("WF") || file.getName().contains("Empty")) {

                                } else {
                                    obserfileDTO.setFolderLocation(name);
                                    obserfileDTO.setFolderName(file.getName());
                                    obserfileDTO.setProjectID(idlist);
                                    foldername[i] = file.getName();
                                    i++;
                                }

                            }

                            folderNameslist.add(obserfileDTO);

                        }
                    }

                }
            }
        }
        this.logger.info("--------> Reading Dynamic folder successfull");
        if (folder.exists()) {

        } else {
            observationFileDTO obserfileDTO = new observationFileDTO();
            obserfileDTO.setFolderName("Empty");
            folderNameslist.add(obserfileDTO);
        }

        return folderNameslist;
    }

    // *********************************** list of observation from cemilac for
    // Upload page

    public List<ObservationForUploadPageDTO> ObservationListForUploadPage(List<File> tarlist) throws Exception {

        List<ObservationForUploadPageDTO> folderNameslist = new ArrayList<>();

        List<File> allfolder = tarlist;
        for (File folname : allfolder) {

            if (Utility.isValid(folname.getName()) == false) {
                this.logger.info("--------> file name contains invalid characters");
                return folderNameslist;
            }
            if (folname.getName().contains("Dynamic")) {
                String name = folname.getName();
                name = name.substring(0, name.lastIndexOf("."));

                String app_matrix_file = "";
                app_matrix_file = downloadlocation + name + "/" + projectIDAppMatrix + "/";

                File folder = new File(app_matrix_file);

                if (folder.isDirectory()) {
                    File[] files = folder.listFiles();
                    for (File file : files) {
                        ObservationForUploadPageDTO obserfileDTO = new ObservationForUploadPageDTO();
                        if (file.isDirectory()) {

                            obserfileDTO.setFolderName(file.getName());
                            obserfileDTO.setFolderloc(name);

                        }
                        folderNameslist.add(obserfileDTO);
                    }

                } else
                    folderNameslist.add(null);
            }
        }

        return folderNameslist;
    }

    // *************************************************** ends here

    // ************************************************** Read Applicability Matrix
    // ***********************************************

    @GetMapping({ "IterationHistory" })
    public ModelAndView IterationHistory(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String iterNumber = "";
        String page = "IterationHistory";
        ModelAndView mv = new ModelAndView(page);
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("iterNumber".equals(cookie.getName())) {
                    iterNumber = cookie.getValue();
                    break;
                }
            }
        }

        mv.addObject("iterationHistoryList", iterationHistory());
        mv.addObject("iterNumber", iterNumber);

        return mv;
    }

    public List<DocHistoryDTO> iterationHistory() throws Exception {
        String app_matrix_file = "";
        List<DocHistoryDTO> iterationHistoryDocList = new ArrayList<>();
        app_matrix_file = id_for_staticfolder + "_STATIC/" + projectIDAppMatrix;
        String fileName = downloadlocation + app_matrix_file + "_AM.xlsx";

        if (Utility.fileExists(fileName)) {
            FileInputStream excelFile = new FileInputStream(new File(fileName));

            XSSFWorkbook workbook = new XSSFWorkbook(excelFile);

            try {

                XSSFSheet worksheet = workbook.getSheetAt(0);
                if (worksheet == null) {
                    this.logger.error("---------->Worksheet not found");
                    return iterationHistoryDocList;
                }

                int pendingfound = 0;
                for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {

                    XSSFRow row = worksheet.getRow(i);
                    if (row == null) {
                        this.logger.error("---------->Row not found");
                        return iterationHistoryDocList;
                    }
                    DocHistoryDTO docHistoryDTO = new DocHistoryDTO();

                    DocHistoryDTO invalidData = new DocHistoryDTO();

                    if (Utility.isValid(String.valueOf(row.getCell(2))) == false
                            || Utility.isValid(String.valueOf(row.getCell(3))) == false
                            || Utility.isValid(String.valueOf(row.getCell(4))) == false
                            || Utility.isValid(String.valueOf(row.getCell(5))) == false) {

                        this.logger.info("--------> excel file contains invalid characters");
                        iterationHistoryDocList.clear();
                        iterationHistoryDocList.add(invalidData);
                        return iterationHistoryDocList;
                    }

                    String row1 = String.valueOf(row.getCell(1));
                    if (Integer.parseInt(String.valueOf(row.getCell(4))) < maxiteration) {
                        if (row1 != null && String.valueOf(row.getCell(1)) != "" && row1 != null) {
                            docHistoryDTO.setInterationNumber(Integer.parseInt(String.valueOf(row.getCell(4))));
                            docHistoryDTO.setDocumName(row1);
                            docHistoryDTO.setDocumStatus(String.valueOf(row.getCell(2)));

                        }
                        iterationHistoryDocList.add(docHistoryDTO);
                    }

                }
            } catch (Exception e) {

                e.printStackTrace();

            }
        }

        return iterationHistoryDocList;
    }

    private List<StatusFileDTO> readXLSX(String strprojectIDAppMatrix) throws Exception {

        this.logger.info("---------->Reading Applicability matrix file");
        maxiteration = 1;
        String app_matrix_file = "";
        List<StatusFileDTO> statusFileList = new ArrayList<>();
        app_matrix_file = id_for_staticfolder + "_STATIC/" + strprojectIDAppMatrix;

        String fileName = downloadlocation + app_matrix_file + "_AM.xlsx";
        if (Utility.isValid(fileName) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return statusFileList;
        }
        if (Utility.fileExists(fileName)) {
            FileInputStream excelFile = new FileInputStream(new File(fileName));

            XSSFWorkbook workbook = new XSSFWorkbook(excelFile);
            boolean isRowBlank = true;
            try {

                XSSFSheet worksheet = workbook.getSheetAt(0);
                int pendingfound = 0;
                for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {

                    XSSFRow row = worksheet.getRow(i);
                    StatusFileDTO statusFileDTO = new StatusFileDTO();
                    isRowBlank = true;

                    try {
                        Cell iterCell = row.getCell(4);
                        if (iterCell == null)
                            continue;

                        String iteration = String.valueOf(iterCell).trim();

                        if (Integer.parseInt(iteration) > maxiteration) {
                            maxiteration = Integer.parseInt(iteration);
                        }

                    } catch (Exception e) {
                        this.logger.error("---------->Blank Cell/Null value found in excel cell" + e);

                    }

                }
                for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {

                    XSSFRow row = worksheet.getRow(i);
                    StatusFileDTO invalidData = new StatusFileDTO(null, "invalid", "invalid", "invalid", "invalid");
                    if (Utility.isValid(String.valueOf(row.getCell(1))) == false
                            || Utility.isValid(String.valueOf(row.getCell(2))) == false
                            || Utility.isValid(String.valueOf(row.getCell(3))) == false
                            || Utility.isValid(String.valueOf(row.getCell(4))) == false) {

                        this.logger.info("--------> Excel file contains invalid characters");
                        statusFileList.clear();
                        statusFileList.add(invalidData);
                        return statusFileList;
                    }

                    String docname = String.valueOf(row.getCell(1)).trim();
                    String status = String.valueOf(row.getCell(2)).trim();
                    String remark = String.valueOf(row.getCell(3)).trim();
                    String iteration = String.valueOf(row.getCell(4)).trim();

                    StatusFileDTO statusFileDTO = new StatusFileDTO();
                    isRowBlank = true;
                    if (status.equalsIgnoreCase("NotRequired")) {

                    } else {
                        if (iteration.equalsIgnoreCase(String.valueOf(maxiteration))) {

                            if (docname != null && docname != "" && docname != null) {
                                statusFileDTO.setDocName(docname);
                                isRowBlank = false;

                            }
                            if (status != null) {

                                statusFileDTO.setStatus(status);

                                if (status.equalsIgnoreCase("Pending")) {

                                    if (pendingfound == 0) {
                                        statusFileDTO.setDocNeed("Needed");
                                        pendingfound = 1;
                                    } else if (pendingfound == 1) {
                                        statusFileDTO.setDocNeed("NotNeeded");
                                    }
                                }

                                if (status.equalsIgnoreCase("ReUpload") || status.equalsIgnoreCase("Accepted")
                                        || status.equalsIgnoreCase("Approved")
                                        || status.equalsIgnoreCase("Submitted")) {
                                    statusFileDTO.setDocNeed("Needed");

                                }
                                if (!status.equalsIgnoreCase("ReUpload") && !status.equalsIgnoreCase("Accepted")
                                        && !status.equalsIgnoreCase("Submitted") && !status.equalsIgnoreCase("Approved")
                                        && !status.equalsIgnoreCase("Pending")) {
                                    statusFileDTO.setDocNeed("NotNeeded");
                                }

                            }
                            if (status == null) {
                                statusFileDTO.setStatus("blank");
                            }
                            if (remark != null) {
                                Cell c = row.getCell(3);
                                if (c == null)
                                    statusFileDTO.setRemarks("");
                                else
                                    statusFileDTO.setRemarks(remark);
                            }
                            if (!isRowBlank)
                                statusFileList.add(statusFileDTO);
                        }

                    }

                }

            } catch (Exception ex) {
                ex.printStackTrace();
            } finally {
                workbook.close();
                excelFile.close();

            }

            return statusFileList;

        } else {

            return statusFileList;
        }
    }

    // ********************************* zip folder, subfolder and files
    // ****************************************
    public static void zipFolder(String srcFolder, String destZipFile) throws Exception {

        TarArchiveOutputStream zip = null;

        FileOutputStream fileWriter = null;
        fileWriter = new FileOutputStream(destZipFile);

        zip = new TarArchiveOutputStream(fileWriter);
        addFolderToZip("", srcFolder, zip);
        zip.flush();
        zip.close();
        fileWriter.close();
    }

    private static void addFileToZip(String path, String srcFile, TarArchiveOutputStream zip) throws Exception {
        File file = new File(srcFile);

        if (Utility.isValid(file.getName()) == false) {

            return;
        }
        if (file.isDirectory()) {
            addFolderToZip(path, srcFile, zip);
        } else {

            try (FileInputStream in = new FileInputStream(file)) {
                TarArchiveEntry entry = new TarArchiveEntry(path + "/" + file.getName());
                entry.setSize(file.length()); // Set the correct size in the header
                zip.putArchiveEntry(entry);

                byte[] buf = new byte[1024];
                int len;
                while ((len = in.read(buf)) != -1) {
                    zip.write(buf, 0, len);
                }

            } finally {
                zip.closeArchiveEntry();
            }
        }
    }

    private static void addFolderToZip(String path, String srcFolder, TarArchiveOutputStream zip) throws Exception {
        File folder = new File(srcFolder);

        if (Utility.isValid(folder.getName()) == false) {

            return;
        }
        for (String fileName : folder.list()) {
            if (path.equals("")) {
                addFileToZip(folder.getName(), srcFolder + "/" + fileName, zip);
            } else {
                addFileToZip(path + "/" + folder.getName(), srcFolder + "/" + fileName, zip);
            }
        }
    }

    public static void deleteFolder(File folder) {
        if (folder.isDirectory()) {

            FileSystemUtils.deleteRecursively(folder);

        }

    }

    @PostMapping(value = { "upload-save" }, consumes = { "multipart/form-data" })
    public String uploadSave(@RequestParam("fileData") MultipartFile[] fileDatas, @RequestParam("id") int mode,
            @RequestParam("uploadIndex") int uploadIndex, @RequestParam("docName") String documentName,
            @RequestParam("projectID") String projectID, HttpServletRequest request) throws Exception {

        String tokenID = Utility.computeSHA256Hash((String) request.getSession().getAttribute("token"));
        String tokenFileName = "DAID.txt";

        this.logger.info("--------> Started Process to Upload File");
        String status = "success";
        MultipartFile fileData = fileDatas[uploadIndex];
        try {
            String filelengthcheck = DA_ID + "/" + projectID + "/" + documentName + "/"
                    + fileData.getOriginalFilename();

            boolean isValid = FileValidator.isValidFileExtension(fileData); // check for valid file type extension
            if (!isValid) {
                this.logger.error("--------> Error - Upload Fail: Invalid file type");
                return "InvalidFileType";

            }

            String filename = fileData.getOriginalFilename();
            this.logger.info("-File Name------->" + filename);

            if (filename.matches(".*[`~!@#$%^&*();:'/?\\\\,].*")) {
                this.logger.error("--------> Error: File name contains invalid characters" + filename);
                status = "invalidfilename";
                return status;

            } else {
                if (filelengthcheck.getBytes().length > 95) // check length of file name
                {

                    status = "maxfilelength";
                }

                else {
                    if (fileData.getSize() <= 499897860) // check selected file size.

                    {

                        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("ddMMyyyyHHmmss");
                        LocalDateTime now = LocalDateTime.now();
                        String DAID_DATE_Time = DA_ID + "_" + dtf.format(now);

                        File currentDirFile = new File(".");

                        if (Utility.isValid(currentDirFile.getName()) == false) {
                            this.logger.info("--------> file name contains invalid characters");
                            return "invalid";
                        }
                        String helper = currentDirFile.getAbsolutePath();
                        String parentFolder = helper.substring(0, helper.length() - 1);

                        String filePath = "/" + parentFolder + "/" + "temp/" + DA_ID + "/" + projectID + "/"
                                + documentName + "/";

                        File file = new File(filePath);
                        if (!Utility.fileExists(filePath))
                            file.mkdirs();
                        filePath = String.valueOf(filePath) + fileData.getOriginalFilename();
                        file = new File(filePath);
                        if (!Utility.fileExists(filePath))
                            file.createNewFile();

                        File tokenfine = new File("/" + parentFolder + "/" + "temp/" + DA_ID + "/" + projectID + "/"
                                + documentName + "/" + tokenFileName);
                        tokenfine.getParentFile().mkdirs();
                        appendTextToFile(tokenfine, tokenID);

                        FileOutputStream fos = new FileOutputStream(file);
                        fos.write(fileData.getBytes());
                        String srcFolder = parentFolder + "temp/" + DA_ID;
                        String destZipFile = parentFolder + "temp" + "/" + DAID_DATE_Time + ".tar";

                        zipFolder(srcFolder, destZipFile);

                        NativeInterfaceConfig config = new NativeInterfaceConfig();
                        NativeInterface nativeInterface = config.getNativeInterface();

                        int iStatus = -1;
                        try {
                            this.logger.info("-------->CAIR Upload function is called");
                            iStatus = nativeInterface.uploadData(mode, destZipFile);
                            this.logger.info("-------->CAIR Upload function call ends with status: " + iStatus);
                        } catch (Exception e) {
                            this.logger.error("-------->Error while uploading the file" + e);
                            e.printStackTrace();

                        } finally {
                            fos.close();
                            file.delete();
                        }

                        Utility.deleteFile(destZipFile);

                        File delfolder = new File("/" + parentFolder + "/" + "temp/");
                        deleteFolder(delfolder);
                        status = uploadfileStatus(filename, iStatus);

                    } else {

                        this.logger.error("-------->Error: file size is greater than 500 MB");
                        status = "File Size Greater";

                    }
                }
            }

        } catch (Exception e) {
            this.logger.error("Error:------->" + e);
            e.printStackTrace();
        }

        return status;

    }

    private String uploadfileStatus(String filename, int iStatus) throws Exception {

        if (Utility.isValid(filename) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return "invalid";
        }

        UploadFileStatus status = UploadFileStatus.valueOf(iStatus);
        String strStatus = status != null ? status.toString() : "Error";
        this.logger.info("Upload Status of File " + filename + " is " + strStatus);
        return strStatus;

    }

    private static void appendTextToFile(File file, String text) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write(text);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GetMapping({ "download" })
    public ModelAndView download() throws IOException, Exception {
        String page = "download";

        ModelAndView mv = new ModelAndView(page);
        mv.addObject("HeaderDataDTO", daidnamedata());
        return mv;
    }

    @GetMapping("downloadData")
    public String downloadData(@RequestParam("mode") int mode) throws Exception, IOException { // ,
                                                                                               // @RequestParam("downloadPath")
                                                                                               // String downloadPath)

        this.logger.info("-------->Starting process to download dynamic file");

        List<File> tarfilelist = new ArrayList<>();

        String status = "";
        String downloadPath = downloadlocation;

        if (dynamiccallcheck == 0) {

            int totaltarfiles = 0;
            int foundcrrpt = 0;
            int totalcrrptfiles = 0;
            dynamiccallcheck = 1;
            int malfile = 0;
            File dynamicfolder = null;
            int totalobseronproject = 0;
            int singlecorrptchk = 0;
            int singlenotcorrptchk = 0;

            try {
                File file = new File(downloadPath);
                if (!Utility.fileExists(downloadPath))
                    file.mkdirs();
                NativeInterfaceConfig config = new NativeInterfaceConfig();
                NativeInterface nativeInterface = config.getNativeInterface();
                if (!StringUtils.hasText(downloadPath)) {
                    downloadPath = downloadlocation;
                }

                int iStatus = -1;
                try {
                    this.logger.info("-------->CAIR Dynamic download function is called");
                    iStatus = nativeInterface.downloadData(mode, downloadPath); // mode=1 (for Dynamic status download)
                    this.logger.info("-------->CAIR Dynamic download function call end");

                } catch (Exception e) {
                    e.printStackTrace();
                    this.logger.error("Error:------->" + e);

                }

                if (iStatus == 0) {

                    status = dynamicDownloadSuccessStatus(tarfilelist, status, totaltarfiles, totalcrrptfiles, malfile,
                            totalobseronproject, singlecorrptchk, singlenotcorrptchk);

                } else
                    status = dynamicDownloadStatus(iStatus);
            } catch (Exception ex) {
                ex.printStackTrace();
                status = "failure";
                this.logger.error("Error in dynamic download function:------->" + ex);
            }
            // }
        }

        this.logger.info("Dynamic download function ends");
        return status;
    }

    private String dynamicDownloadSuccessStatus(List<File> tarfilelist, String status, int totaltarfiles,
            int totalcrrptfiles, int malfile, int totalobseronproject, int singlecorrptchk, int singlenotcorrptchk)
            throws Exception {
        int foundcrrpt;
        File dynamicfolder;
        this.logger.info("-------->Dynamic file downloaded successfully");

        File list = new File(downloadlocation);
        File dynamicfilellist[] = list.listFiles();
        for (File subfolder : dynamicfilellist) // count total number of tar files
        {
            if (Utility.isValid(subfolder.getName()) == false) {
                this.logger.info("--------> file name contains invalid characters");
                return "invalid";
            }

            if (subfolder.getName().contains("Dynamic.tar")) {
                tarfilelist.add(subfolder);
                totaltarfiles++;
            }
        }
        this.logger.info("-------->Extracting Downloaded dyanmic file");
        tarfile = tarfilelist;
        for (File subfolder : dynamicfilellist) {
            if (subfolder.getName().contains("Dynamic.tar")) {
                String fileZip = downloadlocation + subfolder.getName();

                if (Utility.isValid(fileZip) == false) {
                    this.logger.info("--------> file name contains invalid characters");
                    return "invalid";
                }

                if (Utility.fileExists(fileZip)) {
                    File destDir = new File(downloadlocation);

                    byte[] buffer = new byte[1024];

                    try (TarArchiveInputStream zis = new TarArchiveInputStream(new FileInputStream(fileZip))) {
                        TarArchiveEntry zipEntry;

                        while ((zipEntry = zis.getNextTarEntry()) != null) {
                            File newFile = new File(destDir, zipEntry.getName());

                            if (zipEntry.isDirectory()) {
                                if (!newFile.isDirectory() && !newFile.mkdirs()) {
                                    throw new IOException("Failed to create directory " + newFile);
                                }
                            } else {
                                File parent = newFile.getParentFile();
                                if (!parent.isDirectory() && !parent.mkdirs()) {
                                    throw new IOException("Failed to create directory " + parent);
                                }

                                try (FileOutputStream fos = new FileOutputStream(newFile)) {
                                    int len;
                                    while ((len = zis.read(buffer)) > 0) {
                                        fos.write(buffer, 0, len);
                                    }
                                }
                            }
                        }
                    } catch (IOException e) {
                        if (e.getMessage().contains("unexpected EOF with 1024 bytes unread")) {

                        } else {

                        }
                    }

                    Utility.deleteFile(fileZip);
                    String downfilecheck = fileZip.substring(0, fileZip.lastIndexOf("."));
                    dynamicfolder = new File(downfilecheck);

                    if (dynamicfolder.isDirectory()) {

                        File proidchk[] = dynamicfolder.listFiles();
                        foundcrrpt = 0;
                        for (File proid : proidchk) {

                            if (proid.isDirectory()) {
                                totalobseronproject++;
                                String filenamefol = proid.getAbsolutePath();

                                File filenamefolder = new File(filenamefol);
                                if (filenamefolder.list().length == 0) {

                                    singlecorrptchk++;
                                    foundcrrpt = 1;
                                } else {
                                    File filenamefolderchk[] = filenamefolder.listFiles();
                                    for (File insidedocnamefolder : filenamefolderchk) {

                                        if (insidedocnamefolder.isDirectory()) {
                                            String filename = insidedocnamefolder.getAbsolutePath();

                                            File filenamechk = new File(filename);
                                            String doclist[] = filenamechk.list();
                                            if (doclist.length > 0) {
                                                singlenotcorrptchk++;

                                                downloadedProjectIDList.add(proid.getName());

                                            } else {
                                                singlecorrptchk++;
                                                String s = dynamicfolder.getName();
                                                foundcrrpt = 1;
                                                File f = new File(s);
                                                dynamiccorruptlist.add(f);

                                                insidedocnamefolder.delete();

                                            }
                                        } else {
                                            singlecorrptchk++;
                                            foundcrrpt = 1;

                                            String s = dynamicfolder.getName();
                                            File f = new File(s);
                                            dynamiccorruptlist.add(f);

                                        }
                                    }
                                }

                            }

                            if (proid.isFile()) {
                                malfile++;
                            }

                        }
                        for (File fordelete : proidchk) {

                            if (fordelete.isDirectory()) {

                                if (foundcrrpt == 1) {
                                    deleteFolder(fordelete);

                                }
                            }
                        }
                        if (foundcrrpt == 1) {
                            totalcrrptfiles++;
                        }
                        foundcrrpt = 0;
                    }

                } else {
                    status = "Tar not available";
                }
            }
        }
        this.logger.info("-------->Extraction of downloaded dynamic file completed");
        if (singlenotcorrptchk > 0) {

            observationStatus(tarfilelist);
            // infectedFileList(tarfilelist);
        }
        infectedFileList(tarfilelist);
        if (totaltarfiles == 1) {
            if (singlecorrptchk > 0) {
                status = "File Corrupted";

                infectedFileList(tarfilelist);
            } else if (malfile > 0 && totalobseronproject == 0) {
                status = "Only mal found";

                infectedFileList(tarfilelist);
            } else if (totalobseronproject == 0 && malfile == 0) {
                status = "Tar not available";
                infectedFileList(tarfilelist);
            } else {
                status = "success";
                infectedFileList(tarfilelist);
            }
        } else if (totaltarfiles > 1) {

            if (totaltarfiles == totalcrrptfiles) {
                status = "File Corrupted";
            } else if (singlecorrptchk > 0) {
                status = "Some files corrupt";

                infectedFileList(tarfilelist);
            } else {
                status = "success";
                infectedFileList(tarfilelist);
            }

        }
        return status;
    }

    private String dynamicDownloadStatus(int iStatus) throws Exception {

        DownloadFileStatus status = DownloadFileStatus.valueOf(iStatus);
        String strStatus = status != null ? status.toString() : "Error";
        this.logger.info("Download Status of File is------->" + strStatus);
        return strStatus;

    }

    // **********************************Used in unzip process
    // **************************************
    public static File newFile(File destinationDir, TarEntry zipEntry) throws IOException {
        File destFile = new File(destinationDir, zipEntry.getName());

        String destDirPath = destinationDir.getCanonicalPath();
        String destFilePath = destFile.getCanonicalPath();

        if (!destFilePath.startsWith(destDirPath + File.separator)) {
            throw new IOException("Entry is outside of the target dir: " + zipEntry.getName());
        }

        return destFile;
    }

    // ************************************* Code Ends here

    // for download status, mode=2 (for static download)

    @GetMapping("downloadStatus")
    public String downloadStatus() throws Exception {
        this.logger.info("-------->Starting process to download static file");
        String status = "";
        String downloadPath = downloadlocation;
        int staticfilecheck = 0;
        // **************check static folder is present or not if not present than
        // download from server
        File dire = new File(downloadlocation);
        File[] fileList1 = dire.listFiles();
        String sFile = "";
        String cFile = "";

        this.logger.info("-------->Checking the presence of Static file in DA System");
        for (File file1 : fileList1) // used to check .TAr static file is present or not
        {

            if (Utility.isValid(file1.getName()) == false) {
                this.logger.info("--------> file name contains invalid characters");
                return "invalid";
            }

            if (file1.isDirectory() && file1.getName().contains("STATIC")) {
                File statichk = new File(downloadPath + file1.getName());
                if (Utility.fileExists(downloadPath + file1.getName())) {
                    File[] listoffileinstaticfolder = statichk.listFiles();
                    for (File filechk : listoffileinstaticfolder) {

                        if (filechk.getName().equalsIgnoreCase("status.xlsx")) {

                            sFile = "yes";
                        } else if (filechk.getName().contains("sys.out")) {

                            cFile = "yes";

                        }

                    }
                }

                staticfilecheck = 1;

            }
        }
        if (staticfilecheck == 1) {
            this.logger.info("-------->Static file is present");
            if (sFile == "yes" && cFile == "yes") {
                status = "success";
            } else {
                this.logger.error("-------->Static file is found corrupted");
                status = "corrupted";

            }
        }

        int iStatus = -1;
        if (staticfilecheck == 0) {
            this.logger.info("-------->Static file is not present");
            try {

                File file = new File(downloadPath);
                if (!Utility.fileExists(downloadPath))
                    file.mkdirs();
                NativeInterfaceConfig config = new NativeInterfaceConfig();
                NativeInterface nativeInterface = config.getNativeInterface();
                if (!StringUtils.hasText(downloadPath)) {
                    downloadPath = downloadlocation;
                }

                try {
                    this.logger.info("-------->Calling CAIR download static function");
                    iStatus = nativeInterface.downloadData(2, downloadPath); // mode=2 (for Static status download)

                    this.logger.info("-------->CAIR download static function called with status: " + iStatus);
                } catch (Exception e) {
                    e.printStackTrace();
                    this.logger.error("-------->Error: " + e);
                }

                if (iStatus == 0) {

                    this.logger.info("-------->Static file downloaded successfully");

                    String folderNameContains = "STATIC";
                    String searchDirectory = downloadlocation;
                    staticfolderid = "";
                    File directory = new File(searchDirectory);
                    File[] fileList = directory.listFiles();

                    for (File file1 : fileList) // used to check .TAr static file is present or not
                    {
                        if (Utility.isValid(file1.getName()) == false) {
                            this.logger.info("--------> file name contains invalid characters");
                            return "invalid";
                        }

                        if (file1.isFile() && file1.getName().contains(folderNameContains)) {
                            String filename = file1.getName();
                            staticfolderid = filename.substring(0, filename.indexOf("_"));

                        }
                    }
                    String fileZip = downloadlocation + staticfolderid + "_STATIC.tar";

                    File destDir = new File(downloadlocation);

                    byte[] buffer = new byte[1024];

                    try (TarArchiveInputStream zis = new TarArchiveInputStream(new FileInputStream(fileZip))) {
                        TarArchiveEntry zipEntry;
                        this.logger.info("-------->Extracting downloaded static file");
                        while ((zipEntry = zis.getNextTarEntry()) != null) {
                            File newFile = new File(destDir, zipEntry.getName());

                            if (zipEntry.isDirectory()) {
                                if (!newFile.isDirectory() && !newFile.mkdirs()) {
                                    throw new IOException("Failed to create directory " + newFile);
                                }
                            } else {
                                File parent = newFile.getParentFile();
                                if (!parent.isDirectory() && !parent.mkdirs()) {
                                    throw new IOException("Failed to create directory " + parent);
                                }

                                try (FileOutputStream fos = new FileOutputStream(newFile)) {
                                    int len;
                                    while ((len = zis.read(buffer)) > 0) {
                                        fos.write(buffer, 0, len);
                                    }
                                }
                            }
                        }
                        this.logger.info("-------->Static file extracted successfully");
                    } catch (IOException e) {
                        if (e.getMessage().contains("unexpected EOF with 1024 bytes unread")) {
                            this.logger.info("-------->Error: " + e);
                        } else {
                            // logger.severe("An error occurred: " + e.getMessage());
                        }
                    }
                    // used to check static folder contains file or not
                    File dir = new File(downloadlocation);
                    File[] flist = dir.listFiles();
                    String statusFile = "No";
                    String credFile = "No";

                    this.logger
                            .info("-------->Starting process to check static if downloaded file is corrupted or not");
                    for (File file1 : flist) {

                        if (Utility.isValid(file1.getName()) == false) {
                            this.logger.info("--------> file name contains invalid characters");
                            return "invalid";
                        }

                        if (file1.isDirectory() && file1.getName().contains("STATIC")) {
                            File f = new File(downloadPath + file1.getName());

                            if (f.list().length > 0) {
                                File staticlist[] = f.listFiles();
                                for (File filestatic : staticlist) {

                                    if (Utility.isValid(filestatic.getName()) == false) {
                                        this.logger.info("--------> file name contains invalid characters");
                                        return "invalid";
                                    }
                                    if (filestatic.getName().equalsIgnoreCase("status.xlsx")) {

                                        statusFile = "yes";
                                    } else if (filestatic.getName().contains("credential.xlsx")) {

                                        String filepath = filestatic.getAbsolutePath();
                                        int staticIndex = filepath.indexOf("STATIC");
                                        String newPath = filepath.substring(0, staticIndex + "STATIC".length());

                                        File oldfile = new File(newPath + "/credential.xlsx");
                                        File newfile = new File(newPath + "/sys.out");
                                        oldfile.renameTo(newfile);

                                        credFile = "yes";

                                    }
                                }
                            } else {
                                status = "corrupted";
                                this.logger.info("-------->Downloaded static file is corrupted");
                            }

                            staticfilecheck = 1;

                            break;

                        }
                    }

                    Utility.deleteFile(fileZip);

                    if (statusFile == "yes" && credFile == "yes") {
                        status = "success";
                        this.logger.info("-------->Downloaded static file is not corrupted");

                    } else {
                        System.err.println("Comes from here");
                        status = "corrupted";

                    }
                } else
                    status = downloadStaticStatus(iStatus);
            } catch (Exception ex) {
                ex.printStackTrace();
                this.logger.error("Static download--------->Error:------->" + ex);
                status = "failure";
            }
        }
        this.logger.info("static download function ends");
        return status;
    }

    private String downloadStaticStatus(int iStatus) throws Exception {

        DownloadFileStatus status = DownloadFileStatus.valueOf(iStatus);
        String strStatus = status != null ? status.toString() : "Error";
        this.logger.info("Download Status of File is------->" + strStatus);
        return strStatus;

    }

    @GetMapping("dpdClient")
    public int dpdClient() throws Exception, IOException {
        this.logger.info("Testing The Native Interface Connection");
        int iStatus = -1;
        try {
            this.logger.info("Calling the CAIR dpdClient Function to Check the Connection");
            NativeInterfaceConfig config = new NativeInterfaceConfig();
            NativeInterface nativeInterface = config.getNativeInterface();
            iStatus = nativeInterface.dpdClient();

            this.logger.info("The Status for After Calling the Native Interface is :" + iStatus);

        } catch (Exception ex) {
            ex.printStackTrace();

            this.logger.error("Connection function--------->Error:------->" + ex);
        }
        this.logger.info("Check connectio function ends");
        return iStatus;

    }

    @GetMapping("connectionStatus") // for connection status
    public String connectionStatus() throws Exception, IOException {
        this.logger.info("-------->Starting process to check connection status");
        String status = "success";
        try {
            this.logger.info("-------->CAIR dpdcli() function called to check connection");
            NativeInterfaceConfig config = new NativeInterfaceConfig();
            NativeInterface nativeInterface = config.getNativeInterface();
            int iStatus = nativeInterface.dpdClient();

            this.logger.info("-------->Check connection function called with status: " + iStatus);

            if (iStatus == 0) {

                checkConnectionStatus = "success";
                this.logger.info("-------->Connection successfull");
                status = "success";
            } else if (iStatus == -2) {
                checkConnectionStatus = "socket fail";
                status = "socket fail";
                this.logger.error("Connection function--------->Error:------->" + status);
            } else if (iStatus == -3) {
                status = "bind fail";
                checkConnectionStatus = "bind fail";
                this.logger.error("Connection function--------->Error:------->" + status);
            } else if (iStatus == -12) {
                status = "not reach";
                checkConnectionStatus = "not reach";
                this.logger.error("Connection function--------->Error:------->" + status);
            } else if (iStatus == -17) {
                status = "Dongle error";
                checkConnectionStatus = "Dongle error";
                this.logger.error("Connection function--------->Error:------->" + status);
            }

        } catch (Exception ex) {
            ex.printStackTrace();

            status = "failure";
            checkConnectionStatus = "failure";
            this.logger.error("Connection function--------->Error:------->" + status);
        }
        this.logger.info("Check connectio function ends");
        return status;

    }

    @GetMapping({ "openfolder" }) // open folder where downloaded files are stored when click on folder icon
                                  // button
    public void openDirectoryInLinux(@RequestParam("projectID") String projectID,
            @RequestParam("docName") String documentName, @RequestParam("foldername") String foldername)
            throws Exception {
        Runtime.getRuntime().exec(new String[] { "sh", "-c", "/usr/bin/xdg-open '/home/da/Downloads/DownloadedData/'"
                + foldername + "/" + projectID + "/" + documentName + "/" });

        String fileName = downloadlocation + DA_ID + "_STATIC" + "/" + "/" + "downloadstatus.xlsx";

        if (Utility.isValid(fileName) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return;
        }
        if (Utility.fileExists(fileName)) {
            XSSFWorkbook workbook = null;
            try (FileInputStream excelFile = new FileInputStream(new File(fileName));
                    FileInputStream ef = new FileInputStream(new File(fileName));
                    XSSFWorkbook work = new XSSFWorkbook(ef);) {

                Sheet ws = work.getSheetAt(0);

                workbook = new XSSFWorkbook(excelFile);

                XSSFSheet worksheet = workbook.getSheetAt(0);
                if (worksheet == null) {
                    this.logger.error("---------->worksheet not found");
                }
                for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {

                    XSSFRow row = worksheet.getRow(i);

                    if (projectID.equalsIgnoreCase(String.valueOf(row.getCell(0)))
                            && documentName.equalsIgnoreCase(String.valueOf(row.getCell(2)))
                            && String.valueOf(row.getCell(3)).equalsIgnoreCase("false")) {
                        String column = "C" + (i + 1);

                        Cell cell = null;
                        cell = ws.getRow(i).getCell(3);
                        cell.setCellValue("True");
                        FileOutputStream os = new FileOutputStream(fileName);
                        work.write(os);

                    }

                }

            } catch (Exception ex) {
                ex.printStackTrace();
            } finally {
                if (workbook != null) {
                    workbook.close();
                }

            }
        }

    }

    @GetMapping({ "/", "/home" })
    public ModelAndView defaultPage(HttpServletRequest request, HttpSession session) throws IOException {
        ModelAndView modelAndView = new ModelAndView();
        String page = "login";

        modelAndView.addObject("title", "ISO");
        modelAndView.addObject("message", "ISO");

        modelAndView.setViewName(page);

        return modelAndView;
    }

    @PostMapping(value = { "upload-pbsfile" }, consumes = { "multipart/form-data" }) // upload PBS file (project
                                                                                     // registration form)
    public String uploadpbsfile(@RequestParam("fileData") MultipartFile fileData, @RequestParam("id") int id)
            throws Exception {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("ddMMyyyyHHmmss");
        LocalDateTime now = LocalDateTime.now();

        String DAID_DATE_Time = "R_" + idforfolder;

        String status = "success";
        String fileName = fileData.getName();

        boolean isValid = FileValidator.isValidFileExtension(fileData); // check for valid file type extension
        if (!isValid) {
            this.logger.error("--------> Error - Upload Fail: Invalid file type");
            return "InvalidFileType";
        }

        if (Utility.isValid(fileName) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return "invalid";
        }
        this.logger.info("Initiating process to upload PBS file--------->File Name:-" + fileName);
        File currentDirFile = new File(".");
        String helper = currentDirFile.getAbsolutePath();

        String parentFolder = helper.substring(0, helper.length() - 1);

        String filePath = parentFolder + "temp/" + "R_" + DA_ID + "/"; // for create folder with daID

        File file = new File(filePath);
        if (!Utility.fileExists(filePath))
            file.mkdirs();
        filePath = String.valueOf(filePath) + fileData.getOriginalFilename();
        file = new File(filePath);
        if (!Utility.fileExists(filePath))
            file.createNewFile();
        try (FileOutputStream fos = new FileOutputStream(file);) {
            fos.write(fileData.getBytes());
        }

        String srcFolder = "/" + parentFolder + "/" + "temp/" + "R_" + DA_ID;
        String destZipFile = "/" + parentFolder + "/temp" + "/" + DAID_DATE_Time + ".tar"; // save file in .TAR format
        try {
            zipFolder(srcFolder, destZipFile);
        } catch (IOException e) {
            e.printStackTrace();
            this.logger.info("Error:- " + e);

        }

        NativeInterfaceConfig config = new NativeInterfaceConfig();
        NativeInterface nativeInterface = config.getNativeInterface();
        this.logger.info("Calling upload function to upload PBS file");
        int iStatus = nativeInterface.uploadData(id, destZipFile);
        this.logger.info("Calaling function ends with Status:-" + iStatus);
        file.delete();

        Utility.deleteFile(destZipFile);

        this.logger.info(fileName + "Uplaoded Successfully");
        return "success";
    }

    // get data of registration form
    @GetMapping({ "downloadView" })
    public ModelAndView downloadView() throws Exception {
        String page = "downloadRegistrationForm";
        ModelAndView mv = new ModelAndView(page);
        List<DownloadRegistFormDataDTO> datalist = new ArrayList<>();
        DownloadRegistFormDataDTO data = new DownloadRegistFormDataDTO();

        File currentDirFile = new File(".");
        String helper = currentDirFile.getAbsolutePath();
        String parentFolder = helper.substring(0, helper.length() - 1);
        String s = "/" + parentFolder + "temp/" + "R_" + DA_ID;

        File exceldatafile = new File("/" + parentFolder + "temp/" + "R_" + DA_ID);

        if (Utility.isValid(exceldatafile.getName()) == false) {
            this.logger.info("--------> file name contains invalid characters");
            return mv;
        }
        File[] f = exceldatafile.listFiles();
        String excelfile = "";
        for (File file : f) {
            if (Utility.isValid(file.getName()) == false) {
                this.logger.info("--------> file name contains invalid characters");
                return mv;
            }
            if (file.getName().contains(".xlsx")) {
                excelfile = file.getName();
                break;
            }
        }
        excelfile = s + "/" + excelfile; // this file contains the data i.e filled by DA

        if (Utility.fileExists(excelfile)) {

            try (FileInputStream excelFile = new FileInputStream(new File(excelfile));
                    XSSFWorkbook workbook = new XSSFWorkbook(excelFile);) {

                XSSFSheet worksheet = workbook.getSheetAt(0);
                if (worksheet == null) {
                    this.logger.info("----------------->Worksheet not found");
                    return mv;
                }

                XSSFRow row = worksheet.getRow(1);

                data.setAppref(String.valueOf(row.getCell(0)));
                data.setFname(String.valueOf(row.getCell(1)));
                data.setLname(String.valueOf(row.getCell(2)));
                data.setJtitle(String.valueOf(row.getCell(3)));
                data.setContNum(String.valueOf(row.getCell(4)));
                data.setEmail(String.valueOf(row.getCell(5)));
                data.setCompName(String.valueOf(row.getCell(6)));
                data.setCompAddress(String.valueOf(row.getCell(7)));
                data.setCompostoffice(String.valueOf(row.getCell(8)));
                data.setState(String.valueOf(row.getCell(9)));
                data.setDist(String.valueOf(row.getCell(10)));
                data.setPincode(String.valueOf(row.getCell(11)));
                data.setDoadetails(String.valueOf(row.getCell(12)));
                data.setDoavalid(String.valueOf(row.getCell(13)));
                data.setDoascope(String.valueOf(row.getCell(14)));
                data.setPoadetails(String.valueOf(row.getCell(15)));
                data.setPoavalid(String.valueOf(row.getCell(16)));
                data.setPoascope(String.valueOf(row.getCell(17)));
                data.setAirSys(String.valueOf(row.getCell(18)));
                data.setProjDetail(String.valueOf(row.getCell(19)));
                data.setPartnum(String.valueOf(row.getCell(20)));
                data.setImtar(String.valueOf(row.getCell(21)));
                data.setCustomFile(String.valueOf(row.getCell(22)));

                datalist.add(data);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        mv.addObject("datalist", datalist);
        mv.addObject("HeaderDataDTO", daidnamedata());
        File delfolder = new File("/" + parentFolder + "/" + "temp/");
        deleteFolder(delfolder);
        return mv;
    }
    // for download certificate

    @PostMapping("/certificate")
    public ModelAndView certificate() throws IOException {
        String page = "certificate";
        ModelAndView mv = new ModelAndView(page);

        List<CertificateNameDTO> certificatlist = certificateList();

        if (certificatlist.isEmpty())
            mv.addObject("CertificatesList", "Empty");
        else
            mv.addObject("CertificatesList", certificatlist);

        return mv;
    }

    // ************************************************ Get List if Issued
    // Certificates
    // ***********************************************************
    public List<CertificateNameDTO> certificateList() throws IOException {
        this.logger.info("----------------->Initiating process to get the list of available certificates for DA");
        String certficatefilepath = "";
        certficatefilepath = downloadlocation + id_for_staticfolder + "_STATIC/Certificates/" + projectIDAppMatrix
                + "/";

        List<CertificateNameDTO> certNames = new ArrayList();

        try {
            this.logger.info("----------------->Initiating process to get the list of available certificates for DA");
            File folder = new File(certficatefilepath);
            if (Utility.fileExists(certficatefilepath)) {
                certFlag = 1;
                File[] files = folder.listFiles();

                for (File file : files) {

                    if (Utility.isValid(file.getName()) == false) {
                        this.logger.info("--------> file name contains invalid characters");
                        return certNames;
                    }

                    CertificateNameDTO certificatenamedto = new CertificateNameDTO();
                    if (file.isFile()) {
                        String fileName = file.getName();

                        if (Utility.isValid(fileName) == false) {
                            this.logger.info("--------> file name contains invalid characters");
                            return certNames;
                        }
                        int dotIndex = fileName.lastIndexOf('.');
                        if (dotIndex > 0) {
                            fileName = fileName.substring(0, dotIndex);
                        }
                        certificatenamedto.setCertificateName(fileName);
                    }
                    if (file.isDirectory()) {
                        String certtype = file.getName();
                        certificatenamedto.setCertificatType(certtype);
                    }
                    certNames.add(certificatenamedto);
                }
            }
        } catch (Exception e) {
            this.logger.error("Error:- " + e);
        }

        this.logger.info("----------------->List of certificates fetched successfully");
        return certNames;
    }

    // ************************************************ ends here
    // ***********************************************************

    // ******************* open folder where certificate files are stored when click
    // on folder icon
    // button*****************************

    @GetMapping({ "opencertificatefolder" })
    public void opencertificatefolder(@RequestParam("projectID") String projectID,
            @RequestParam("certtype") String certtype) throws Exception {
        Runtime.getRuntime().exec(new String[] { "sh", "-c", "/usr/bin/xdg-open '/home/da/Downloads/DownloadedData/'"
                + DA_ID + "_STATIC/Certificates/" + projectID + "/" + certtype + "/" });

    }

    @GetMapping({ "openhelpfile" })
    public void openhelpfileLocation() throws Exception {
        Runtime.getRuntime().exec(new String[] { "sh", "-c",
                "/usr/bin/xdg-open '/home/da/Downloads/DownloadedData/'" + "/" + "Help.pdf" });

    }

    // ******************************** Create observation file for download status
    // *************************************

    public void observationStatus(List<File> tarlist) throws Exception {

        String obserDownloadStatusFile = downloadlocation + DA_ID + "_STATIC";

        File f = new File(obserDownloadStatusFile);
        String observationFileName = "downloadstatus.xlsx";
        File filename = new File(f, observationFileName);

        File downfolloc = new File(downloadlocation);
        File[] allfolder = downfolloc.listFiles();

        for (File folname : allfolder) {

            if (Utility.isValid(folname.getName()) == false) {
                this.logger.info("--------> file name contains invalid characters");
                return;
            }

            if (folname.getName().contains("Dynamic")) {
                String name = folname.getName();

                String downfilecheck = downloadlocation + name + "/";

                if (Utility.fileExists(downfilecheck)) {

                    if (!Utility.fileExists(obserDownloadStatusFile + observationFileName)) {

                        f.mkdir();
                        try (FileOutputStream os = new FileOutputStream(
                                obserDownloadStatusFile + "/" + "downloadstatus.xlsx");
                                XSSFWorkbook work = new XSSFWorkbook()) {
                            Sheet ws = work.createSheet("sheet1");
                            Row row = ws.createRow((short) 0);
                            row.createCell(0).setCellValue("Projectid");
                            row.createCell(1).setCellValue("Dynamicfoldername");
                            row.createCell(2).setCellValue("filelist");
                            row.createCell(3).setCellValue("downloadstatus");

                            List<observationFileDTO> obser = ObservationFileList(tarlist);
                            int rownumber = 1;
                            for (observationFileDTO dashboardDataDTO : obser) {

                                if (dashboardDataDTO.getProjectID() == null) {

                                }

                                else {
                                    Row rownew = ws.createRow((short) rownumber);
                                    rownew.createCell(0).setCellValue(dashboardDataDTO.getProjectID());
                                    rownew.createCell(1).setCellValue(dashboardDataDTO.getFolderLocation());
                                    rownew.createCell(2).setCellValue(dashboardDataDTO.getFolderName());
                                    rownew.createCell(3).setCellValue("false");
                                    rownumber++;
                                }
                            }
                            work.write(os);

                        } catch (Exception e) {
                            e.printStackTrace();
                        }

                    }
                }
            }
        }
    }

    int failcount = 0;

    // login check
    @GetMapping({ "login" })
    public String login(@RequestParam String token, HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        System.err.println("function called");
        request.getSession().setAttribute("token", token);

        String loginstatus = "";

        HttpSession websess = request.getSession();

        HttpSession session = request.getSession();
        session.setMaxInactiveInterval(1800); // 30 minutes session timeout if user inactive from last 30 mintutes

        daidnamedata();

        String passfilelocation = "/home/da/Downloads/DownloadedData/" + DA_ID + "_STATIC/sys.out";
        System.err.println(passfilelocation);

        if (!Utility.fileExists(passfilelocation)) {

            this.logger
                    .error("----------------->Login Failed......Excel file for credential check not exist! Login !!");
            loginstatus = "CredentialFileNotAvailable";
            return loginstatus;
        }

        String staticfolderlocation = "/home/da/Downloads/DownloadedData/" + DA_ID + "_STATIC/";
        File staticfile = new File(staticfolderlocation);

        if (downloadStatus().equalsIgnoreCase("corrupted")) {

            loginstatus = "corrupted";
            this.logger.error("----------------->Login failed, downloaded static file is corrupted");
            return loginstatus;

        }

        if (!checkConnectionStatus.equalsIgnoreCase("success")) {
            loginstatus = "connection fail";
            this.logger.error("----------------->Login failed, connection failedwith the server");
            return loginstatus;
        }

        try (InputStream excelFile = new FileInputStream(passfilelocation);
                XSSFWorkbook workbook = new XSSFWorkbook(excelFile);) {
            Sheet worksheet = workbook.getSheetAt(0);

            Row credDataRow = worksheet.getRow(1);

            if (Utility.isValid(String.valueOf(credDataRow.getCell(0))) == false) {
                this.logger.info("--------> excel file contains invalid characters");

                return "invalid Data";
            }

            if (credDataRow == null)
                return "No Credential Data";

            HeaderDataDTO headerDataDTO = new HeaderDataDTO();

            Cell loginStatusCell = credDataRow.getCell(0);
            if (loginStatusCell == null)
                return "No Login Status Found";

            String valueOfLoginStatus = String.valueOf(loginStatusCell);
            System.err.println("comes");
            if (valueOfLoginStatus.equalsIgnoreCase("no")) {
                headerDataDTO.setDaid(String.valueOf(credDataRow.getCell(0)));

                if (true) {

                    this.logger.info("----------------->Authentication successful");

                    loginStatusCell.setCellValue("yes");
                    FileOutputStream os = new FileOutputStream(passfilelocation);
                    workbook.write(os);
                    loginstatus = "login success";
                    request.getSession().setAttribute("userName", "admin");
                    websess.setAttribute("browser", "open");

                    logstat = "true";

                } else {

                    loginstatus = "Invalid Credentials";
                    this.logger.info("Login failed:- Invalid credentials");
                }
            } else
                loginstatus = "already login";

            if (valueOfLoginStatus.equalsIgnoreCase("Yes")) {
                loginstatus = "already login";
                this.logger.info("Login failed:- User is already logedin");
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        System.err.println("login status is ---" + loginstatus);
        return loginstatus;

    }

    // lohout check
    @GetMapping({ "logout" })
    public String logout(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String folderNameContains = "STATIC";
        String searchDirectory = "/home/da/Downloads/DownloadedData/";

        File directory = new File(searchDirectory);
        File[] fileList = directory.listFiles();

        DA_ID = Utility.getDAID(folderNameContains, fileList);
        ;
        String logoutStatus = "";

        if (readObservationFile().isEmpty()) {
            String passfilelocation = "/home/da/Downloads/DownloadedData/" + DA_ID + "_STATIC/sys.out";
            try (InputStream fileinputstream = new FileInputStream(passfilelocation);

                    XSSFWorkbook work = new XSSFWorkbook(fileinputstream);) {
                if (work == null) {
                    this.logger.error("----------------->worbook is empty");
                    return logoutStatus;
                }
                this.logger.info("----------------->Logout process initiated");
                Sheet ws = work.getSheetAt(0);
                if (ws == null) {
                    this.logger.error("----------------->workbook is empty");
                    return logoutStatus;
                }

                Cell cell = ws.getRow(1).getCell(0);

                cell.setCellValue("No");
                FileOutputStream os = new FileOutputStream(passfilelocation);
                work.write(os);
                logoutStatus = "true";

                dynamiccallcheck = 0;
                Utility.deleteFile("/home/da/Downloads/DownloadedData/" + DA_ID + "_STATIC/downloadstatus.xlsx");
                tarfile.clear();
                downloadedProjectIDList.clear();
                dynamiccorruptlist.clear();
                logstat = "false";
                request.getSession().invalidate();

            } catch (Exception e) {
                e.printStackTrace();
                this.logger.info("Error:- " + e);
            }

        } else {
            logoutStatus = "false";
        }
        this.logger.info("----------------->Logout successfully");
        return logoutStatus;
    }
    // ****************************************** check for files which are not
    // visited by DA
    // ***************************************

    @GetMapping({ "ObservationListPage" })
    public ModelAndView ObservationListPage(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String page = "ObservatioPage";
        ModelAndView mv = new ModelAndView(page);

        if (readObservationFile().isEmpty()) {
            logout(request, response);
        } else {

            mv.addObject("ObservationList", readObservationFile());
            mv.addObject("dashData", dashboarddatareadXLSX());

        }
        return mv;
    }

    public List<ObservationDownloadPendingDTO> readObservationFile() throws Exception {
        String observationfilelocation = downloadlocation + DA_ID + "_STATIC" + "/" + "downloadstatus.xlsx";

        List<DashboardDataDTO> list = dashboarddatareadXLSX();
        List<String> projectIDList = new ArrayList<>();
        for (DashboardDataDTO dashboardDataDTO : list) {

            projectIDList.add(dashboardDataDTO.getProjectID()); // list of all project id available for DA
        }

        File searchLocation = new File(observationfilelocation);
        List<ObservationDownloadPendingDTO> observationDownloadPendingList = new ArrayList<>();

        if (Utility.fileExists(observationfilelocation)) {
            try (FileInputStream observationfile = new FileInputStream(new File(observationfilelocation));
                    XSSFWorkbook workbook = new XSSFWorkbook(observationfile);) {

                if (workbook == null) {
                    this.logger.error("----------------->worbook is empty");
                    return observationDownloadPendingList;
                }
                this.logger.info("----------------->Checking if any files are left for download by DA");
                XSSFSheet worksheet = workbook.getSheetAt(0);
                if (worksheet == null) {
                    this.logger.error("----------------->worksheet is empty");
                    return observationDownloadPendingList;
                }
                for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
                    int flag = 0;
                    ObservationDownloadPendingDTO listofpendingobservations = new ObservationDownloadPendingDTO();

                    XSSFRow row = worksheet.getRow(i);
                    if (row == null) {
                        this.logger.error("----------------->Empty row found in excel");
                        return observationDownloadPendingList;
                    }
                    if (String.valueOf(row.getCell(3)).equalsIgnoreCase("false")) {
                        listofpendingobservations.setProjectID(String.valueOf(row.getCell(0)));
                        listofpendingobservations.setDynamicfoldername(String.valueOf(row.getCell(1)));
                        listofpendingobservations.setDocumentName(String.valueOf(row.getCell(2)));
                        flag = 1;
                    }
                    if (flag == 1)
                        observationDownloadPendingList.add(listofpendingobservations);
                }
                this.logger.info("-----------------> Checking complete");
            } catch (Exception e) {
                e.printStackTrace();
                this.logger.error("Error:- " + e);
            }

        }

        return observationDownloadPendingList;

    }

    public List<InfectedFileListDTO> infectedFileList(List<File> tarlist) throws Exception {

        this.logger.info("----------------->Initiation process to get list of infected files");
        List<InfectedFileListDTO> infectedFileDTOList = new ArrayList();

        List<File> allfolder = tarlist;
        int i = 1;
        for (File folname : allfolder) {
            if (folname.getName().contains("Dynamic")) {
                String fname = folname.getName();
                if (Utility.isValid(fname) == false) {
                    this.logger.info("--------> file name contains invalid characters");
                    return infectedFileDTOList;
                }
                fname = fname.substring(0, fname.lastIndexOf("."));

                String infectedFileLocation = downloadlocation + "/" + fname + "";
                File folder = new File(infectedFileLocation);
                File[] fileist = folder.listFiles();
                if (fileist != null) {

                    for (File file : fileist) {

                        if (Utility.isValid(file.getName()) == false) {
                            this.logger.info("--------> file name contains invalid characters");
                            return infectedFileDTOList;
                        }
                        InfectedFileListDTO infectedfiledto = new InfectedFileListDTO();
                        if (file.isFile() && file.getName().endsWith(".txt") && file.getName().contains("Results")) {
                            int start = (int) (file.getName().length() - 18);
                            String name = (file.getName().substring(19, 33));

                            String day = name.substring(0, 2);
                            String month = name.substring(2, 4);
                            String year = name.substring(4, 8);
                            String hour = name.substring(8, 10);
                            String minute = name.substring(10, 12);
                            String sec = name.substring(12, 14);
                            String infectedfileInfo = i + ".  " + "Date -> " + day + "/" + month + "/" + year + " and "
                                    + " Time -> " + hour + ":" + minute + ":" + sec;

                            i++;
                            infectedfiledto.setInfectedFileInfo(infectedfileInfo);

                            infectedFileDTOList.add(infectedfiledto);
                        }

                    }
                }
            }
        }

        this.logger.info("----------------->Infected file list fetched successfully");
        return infectedFileDTOList;

    }

    // logout on browser close
    public String browserCloseLogout(HttpServletRequest request) throws Exception {

        String folderNameContains = "STATIC";
        String searchDirectory = "/home/da/Downloads/DownloadedData/";

        File directory = new File(searchDirectory);
        File[] fileList = directory.listFiles();

        DA_ID = Utility.getDAID(folderNameContains, fileList);

        String logoutStatus = "";

        String passfilelocation = "/home/da/Downloads/DownloadedData/" + DA_ID + "_STATIC/sys.out";
        try (InputStream fileinputstream = new FileInputStream(passfilelocation);

                XSSFWorkbook work = new XSSFWorkbook(fileinputstream);) {
            if (work == null) {

                return logoutStatus;
            }

            Sheet ws = work.getSheetAt(0);
            if (ws == null) {

                return logoutStatus;
            }

            Cell cell = ws.getRow(1).getCell(0);

            cell.setCellValue("No");
            FileOutputStream os = new FileOutputStream(passfilelocation);
            work.write(os);
            logoutStatus = "true";

            dynamiccallcheck = 0;
            Utility.deleteFile("/home/da/Downloads/DownloadedData/" + DA_ID + "_STATIC/downloadstatus.xlsx");
            tarfile.clear();
            downloadedProjectIDList.clear();
            dynamiccorruptlist.clear();
            logstat = "false";

        } catch (Exception e) {
            if (e instanceof FileNotFoundException) {
                this.logger.info("Static file not present");

            }
        }
        return logoutStatus;
    }

}