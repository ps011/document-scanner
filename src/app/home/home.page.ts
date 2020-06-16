import {Component, OnInit} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {DocsService} from '../services/docs.service';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    recentDocs = [];
    cameraOptions: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.NATIVE_URI,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: false
    };

    constructor(public transfer: FileTransfer, public camera: Camera, public docsService: DocsService) {
    }


    ngOnInit() {
        const user = localStorage.getItem('user');
        this.docsService.getAllDocs(JSON.parse(user).id)
            .subscribe((docs: any) => {
                this.recentDocs = docs;
            });
    }


    takeSnap() {
        this.camera.getPicture(this.cameraOptions).then(async imageData => {
            const uploadedImageData = await this.uploadImage(imageData);
            this.docsService.createDoc({
                url: uploadedImageData.secure_url,
                size: uploadedImageData.bytes,
                format: uploadedImageData.resource_type,
                name: uploadedImageData.public_id.split('/')[1]
            }).subscribe(response => {
                console.log(response);
            });
        }, (err) => {
            console.log(err);
            // Handle error
        });
    }

    async uploadImage(imageData) {
        // Destination URL
        const url = environment.CLOUDINARY_URL;
        // File name only
        const fileName = imageData.split('/')[imageData.split('/').length - 1];
        const options: FileUploadOptions = {
            fileKey: 'file',
            fileName,
            chunkedMode: false,
            mimeType: 'multipart/form-data',
            params: {upload_preset: 'document-scanner'}
        };
        const fileTransfer: FileTransferObject = this.transfer.create();
        try {
            const data = await fileTransfer.upload(imageData, url, options);
            return JSON.parse(data.response);
        } catch (e) {
            console.error(e);
            return null;
        }
// TODO: response from Cloudinary
//    {
//      "asset_id": "8b7c2414be2824a962b38a1ea599a0c9",
//      "public_id": "document-scanner/h5fly7auitlkc8tiwyqo.jpg",
//      "version": 1591650745,
//      "version_id": "f3fb1a2a17612e24b4239370afb96a13",
//      "signature": "045cecdfafbcaab1f0144e4508c68c9a96f89783",
//      "resource_type": "raw",
//      "created_at": "2020-06-08T21:12:25Z",
//      "tags": [],
//      "bytes": 3735396,
//      "type": "upload",
//      "etag": "d525cde3a57f40660918f58252ce3260",
//      "placeholder": false,
//      "url": "http://res.cloudinary.com/designu/raw/upload/s--doemTjGh--/v1591650745/document-scanner/h5fly7auitlkc8tiwyqo.jpg",
//      "secure_url": "https://res.cloudinary.com/designu/raw/upload/s--doemTjGh--/v1591650745/document-scanner/h5fly7auitlkc8tiwyqo.jpg",
//      "access_mode": "authenticated"
//    }
    }

}
