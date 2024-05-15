/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

uniform float checks;
void main() {
    // Calculate the UV coordinates scaled by the number of checkerboard squares
    float x = v_uv.x * checks;
    float y = v_uv.y * checks;

    // Determine if the current pixel is in a light or dark square of the checkerboard
    bool lightSquare = mod(floor(x) + floor(y), 2.0) == 0.0;

    // Scale the UV coordinates differently for colored and black squares
    float scaleFactor = 2.0; // Adjust this value to control the size difference
    if (lightSquare) {
        x *= scaleFactor;
        y *= scaleFactor;
    }

    // Mix light and dark colors based on whether the pixel is in a light or dark square
    vec3 finalColor = lightSquare ? light : dark;

    // Output the final color
    gl_FragColor = vec4(finalColor, 1.0);
}