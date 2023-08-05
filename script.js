$(document).ready(function() {
    let currentColor = "#000000"; // Color inicial
    let pixelSize = 10; // Tamaño de cada píxel (en píxeles)
    let isDrawing = false; // Variable para controlar el dibujo continuo
  
    // Crea el lienzo de píxeles
    const canvas = $("#pixel-canvas");
    const numRows = 50;
    const numCols = 50;
    for (let i = 0; i < numRows; i++) {
      const row = $("<tr>");
      for (let j = 0; j < numCols; j++) {
        const cell = $("<td>");
        cell.css({ width: pixelSize, height: pixelSize });
        cell.on("click", function() {
          if ($("#eraser-btn").hasClass("active")) {
            // Si la goma está activa, cambiar el color de fondo a blanco
            $(this).css("background-color", "#fff");
          } else {
            // Si no, usar el color seleccionado
            $(this).css("background-color", currentColor);
          }
        });
  
        // Agregar eventos para dibujar continuamente al arrastrar el cursor
        cell.on("mousedown", function() {
          isDrawing = true;
          if ($("#eraser-btn").hasClass("active")) {
            // Si la goma está activa, cambiar el color de fondo a blanco
            $(this).css("background-color", "#fff");
          } else {
            // Si no, usar el color seleccionado
            $(this).css("background-color", currentColor);
          }
        });
  
        cell.on("mousemove", function() {
          if (isDrawing) {
            if ($("#eraser-btn").hasClass("active")) {
              // Si la goma está activa, cambiar el color de fondo a blanco
              $(this).css("background-color", "#fff");
            } else {
              // Si no, usar el color seleccionado
              $(this).css("background-color", currentColor);
            }
          }
        });
  
        cell.on("mouseup", function() {
          isDrawing = false;
        });
  
        row.append(cell);
      }
      canvas.append(row);
    }
  
    // Maneja la selección de color desde el input
    $("#color-picker").on("input", function() {
      currentColor = $(this).val();
    });
  
    // Botón para borrar todo el pixel art
    $("#clear-btn").on("click", function() {
      $("td").css("background-color", "#fff");
    });
  
    // Botón para activar/desactivar la goma
    $("#eraser-btn").on("click", function() {
      $(this).toggleClass("active");
    });
  
// Botón para descargar el pixel art como imagen
$("#download-btn").on("click", function() {
    const scale = 2; // Escala para mejorar la calidad (aumenta el tamaño en 2 veces)
    const scaledCanvasSize = pixelSize * scale * numCols;
  
    // Crear un div temporal para la generación de la imagen
    const tempDiv = document.createElement("div");
    const originalCanvas = document.getElementById("pixel-canvas");
    const clonedTable = originalCanvas.cloneNode(true);
    tempDiv.appendChild(clonedTable);
    tempDiv.style.width = scaledCanvasSize + "px";
    tempDiv.style.height = scaledCanvasSize + "px";
    tempDiv.style.overflow = "hidden";
    tempDiv.style.position = "absolute";
    tempDiv.style.top = "-9999px";
  
    document.body.appendChild(tempDiv);
  
    // Generar la imagen usando html2canvas en el div temporal
    html2canvas(clonedTable, {
      scale: scale,
      width: scaledCanvasSize,
      height: scaledCanvasSize
    }).then(function(canvas) {
      const link = document.createElement("a");
      link.download = "pixel_art.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
  
      // Eliminar el div temporal después de la descarga
      document.body.removeChild(tempDiv);
    });
  });   
});