package com.iso.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class FileValidator {

    private static Logger logger = LoggerFactory.getLogger(FileValidator.class);
    private static final String[] ALLOWED_EXTENSIONS = { "docx", "DOCX", "doc", "DOC", "pptx", "PPTX", "ppt", "PPT",
            "txt", "TXT", "xlsx", "XLSX", "jpg", "JPG", "jpeg", "JPEG", "png", "PNG", "gif", "GIF", "bmp", "BMP",
            "tiff", "TIFF", "tif", "TIF", "pdf", "PDF", "xls", "XLS", "zip", "ZIP", "rar", "RAR", "tar", "TAR" };

    public static boolean isValidFileExtension(MultipartFile file) {

        logger.info("--------> Process start to check for valid file extensions");

        String filename = file.getOriginalFilename();

        if (filename != null && filename.contains(".")) {

            String fileExtension = filename.substring(filename.lastIndexOf('.') + 1);
            fileExtension = fileExtension.toLowerCase();
            for (String allowedExtension : ALLOWED_EXTENSIONS) {
                if (allowedExtension.equals(fileExtension)) {
                    logger.info("--------> Invalid extension not found");
                    return true;
                }
            }
        }
        logger.info("--------> Invalid extension found");
        return false;
    }

}
