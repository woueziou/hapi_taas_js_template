const uuid = require('uuid');
const del = require('del');
const fs = require('fs');
/**
 * 
 * @param {String} fileName 
 * @returns 
 */
const imageFilter = function (fileName) {
    // accept image only
    if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
        return false;
    }

    return true;
};

const cleanFolder = function (folderPath) {
    // delete files inside folder but not the folder itself
    del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

/**
 * 
 * @param {*} file 
 * @param {FileUploaderOption} options 
 * @returns 
 */
const uploader = function (file, options) {
    if (!file) throw new Error('no file(s)');

    return Array.isArray(file) ? _filesHandler(file, options) : _fileHandler(file, options);
};


/**
 * 
 * @param {*} file 
 * @param {FileUploaderOption} options 
 * @returns 
 */
const _fileHandler = async function (file, options) {
    if (!file) throw new Error('no file');
    if (!fs.existsSync(options.dest)) {
        fs.mkdirSync(options.dest, {
            recursive: true
        });
    }
    if (options.fileFilter && !options.fileFilter(file.hapi.filename)) {
        throw new Error('type not allowed');
    }

    const originalname = file.hapi.filename;
    const extension = originalname.split('.').pop();

    console.log(originalname);
    console.log(extension);
    const filename = uuid.v1();
    const path = `${options.dest}${filename}.${extension}`;
    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
        file.on('error', function (err) {
            reject(err);
        });

        file.pipe(fileStream);

        file.on('end', function (err) {
            console.log(err);
            const fileDetails = {
                fieldname: file.hapi.name,
                originalname: originalname,
                filename: filename + '.' + extension,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`,
                path,
                size: fs.statSync(path).size,
            };

            resolve(fileDetails);
        });
    });
};

const _filesHandler = function (files, options) {
    if (!files || !Array.isArray(files)) throw new Error('no files');

    const promises = files.map(x => _fileHandler(x, options));
    return Promise.all(promises);
};

const customUploader = function (file) {
    return new Promise((resolve, reject) => {

        fs.writeFile('./upload/test.png', file, err => {
            if (err) {
                reject(err);
            }
            resolve({
                message: 'Upload successfully!'
            });
        });
    });
};

module.exports = {
    imageFilter,
    cleanFolder,
    uploader,
    customUploader
};