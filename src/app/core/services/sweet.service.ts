import { Injectable } from '@angular/core';
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class SweetService {

  showConfirm(text: string, onConfirm: () => any = () => { }, onReject: () => any = () => { }) {
    Swal.fire({
      title: "Confirmación",
      text: text,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "gray",
      confirmButtonText: "Si, seguro",
      cancelButtonText: "Cancelar"
    }).then((result: any) => {
      if (result.isConfirmed) {
        onConfirm();
      } else {
        onReject();
      }
    });
  }

  showSuccess() {
    Swal.fire({
      title: "Satisfactorio",
      text: "Se ha procesado correctamente",
      icon: "success"
    });
  }

  showError(error: string) {
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error"
    });
  }

}
