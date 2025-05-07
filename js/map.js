// Map JavaScript for BrewHaven Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map if the map element exists
    const mapElement = document.getElementById('map');
    if (mapElement) {
        initMap(mapElement);
    }
});

/**
 * Initialize a custom map
 * @param {HTMLElement} mapElement - The map container element
 */
function initMap(mapElement) {
    // Create a custom map using SVG and HTML
    // This is a simplified version without requiring external libraries
    
    // BrewHaven café location in Indore (fictional coordinates)
    const latitude = 22.725672;
    const longitude = 75.872478;
    
    // Create map container
    mapElement.innerHTML = `
        <div class="map-wrapper">
            <div class="map-svg-container">
                <svg class="map-background" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
                    <!-- Background -->
                    <rect x="0" y="0" width="600" height="400" fill="#e8e8e8" />
                    
                    <!-- Major roads -->
                    <line x1="100" y1="200" x2="500" y2="200" stroke="#ffffff" stroke-width="20" />
                    <line x1="300" y1="50" x2="300" y2="350" stroke="#ffffff" stroke-width="15" />
                    
                    <!-- Minor roads -->
                    <line x1="150" y1="100" x2="450" y2="100" stroke="#ffffff" stroke-width="10" />
                    <line x1="150" y1="300" x2="450" y2="300" stroke="#ffffff" stroke-width="10" />
                    <line x1="200" y1="50" x2="200" y2="350" stroke="#ffffff" stroke-width="8" />
                    <line x1="400" y1="50" x2="400" y2="350" stroke="#ffffff" stroke-width="8" />
                    
                    <!-- Road labels -->
                    <text x="300" y="190" text-anchor="middle" fill="#888" font-size="10">Saket Nagar Main Road</text>
                    <text x="310" y="220" text-anchor="middle" fill="#888" transform="rotate(90, 310, 200)" font-size="8">AB Road</text>
                    
                    <!-- Blocks representing buildings -->
                    <rect x="120" y="120" width="40" height="40" fill="#ccc" />
                    <rect x="180" y="120" width="40" height="40" fill="#ccc" />
                    <rect x="240" y="120" width="40" height="40" fill="#ccc" />
                    <rect x="320" y="120" width="40" height="40" fill="#ccc" />
                    <rect x="380" y="120" width="40" height="40" fill="#ccc" />
                    <rect x="440" y="120" width="40" height="40" fill="#ccc" />
                    
                    <rect x="120" y="240" width="40" height="40" fill="#ccc" />
                    <rect x="180" y="240" width="40" height="40" fill="#ccc" />
                    <rect x="240" y="240" width="40" height="40" fill="#ccc" />
                    <rect x="320" y="240" width="40" height="40" fill="#ccc" />
                    <rect x="380" y="240" width="40" height="40" fill="#ccc" />
                    <rect x="440" y="240" width="40" height="40" fill="#ccc" />
                    
                    <!-- Green spaces -->
                    <circle cx="150" cy="150" r="20" fill="#a5d6a7" />
                    <circle cx="450" cy="250" r="30" fill="#a5d6a7" />
                    
                    <!-- Location marker for BrewHaven -->
                    <g class="location-marker" transform="translate(300, 200)">
                        <circle cx="0" cy="0" r="15" fill="#8B5A2B" />
                        <circle cx="0" cy="0" r="8" fill="#F5E1CF" />
                        <circle cx="0" cy="0" r="3" fill="#2F4F4F" />
                    </g>
                </svg>
                
                <!-- Location label -->
                <div class="map-label">
                    <div class="map-label-content">
                        <strong>BrewHaven</strong>
                        <div>27, Saket Nagar Main Road</div>
                    </div>
                </div>
            </div>
            
            <div class="map-controls">
                <button class="map-zoom-in">+</button>
                <button class="map-zoom-out">-</button>
            </div>
        </div>
    `;
    
    // Add styles directly to the map
    addMapStyles(mapElement);
    
    // Implement basic zoom functionality
    const mapSvg = mapElement.querySelector('.map-svg-container');
    const zoomInBtn = mapElement.querySelector('.map-zoom-in');
    const zoomOutBtn = mapElement.querySelector('.map-zoom-out');
    
    let currentZoom = 1;
    const minZoom = 0.8;
    const maxZoom = 2;
    const zoomStep = 0.2;
    
    if (zoomInBtn && zoomOutBtn && mapSvg) {
        zoomInBtn.addEventListener('click', function() {
            if (currentZoom < maxZoom) {
                currentZoom += zoomStep;
                updateZoom();
            }
        });
        
        zoomOutBtn.addEventListener('click', function() {
            if (currentZoom > minZoom) {
                currentZoom -= zoomStep;
                updateZoom();
            }
        });
    }
    
    // Update the zoom level
    function updateZoom() {
        mapSvg.style.transform = `scale(${currentZoom})`;
    }
    
    // Add pulsing animation to marker
    const marker = mapElement.querySelector('.location-marker');
    if (marker) {
        // Add the pulse animation
        const pulseAnimation = document.createElement('style');
        pulseAnimation.textContent = `
            @keyframes pulse {
                0% {
                    transform: translate(300px, 200px) scale(1);
                    opacity: 1;
                }
                50% {
                    transform: translate(300px, 200px) scale(1.2);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(300px, 200px) scale(1);
                    opacity: 1;
                }
            }
            
            .location-marker {
                animation: pulse 2s infinite;
            }
        `;
        document.head.appendChild(pulseAnimation);
    }
    
    // Make map interactive
    enableMapInteraction(mapElement);
}

/**
 * Add styles to the map
 * @param {HTMLElement} mapElement - The map container element
 */
function addMapStyles(mapElement) {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .map-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 6px;
        }
        
        .map-svg-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            transform-origin: center center;
            transition: transform 0.3s ease;
        }
        
        .map-background {
            width: 100%;
            height: 100%;
        }
        
        .map-label {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(10px, -50px);
            background-color: white;
            padding: 5px 10px;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            font-size: 12px;
            z-index: 10;
            pointer-events: none;
        }
        
        .map-label-content {
            white-space: nowrap;
        }
        
        .map-controls {
            position: absolute;
            bottom: 10px;
            right: 10px;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .map-zoom-in, .map-zoom-out {
            width: 30px;
            height: 30px;
            background-color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        .map-zoom-in:hover, .map-zoom-out:hover {
            background-color: #f0f0f0;
        }
    `;
    document.head.appendChild(styleElement);
}

/**
 * Enable map interaction (panning)
 * @param {HTMLElement} mapElement - The map container element
 */
function enableMapInteraction(mapElement) {
    const mapSvg = mapElement.querySelector('.map-svg-container');
    if (!mapSvg) return;
    
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    let currentTranslateX = 0;
    let currentTranslateY = 0;
    
    // Mouse events
    mapSvg.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Touch events
    mapSvg.addEventListener('touchstart', startDrag, { passive: true });
    document.addEventListener('touchmove', drag, { passive: true });
    document.addEventListener('touchend', endDrag);
    
    // Start dragging
    function startDrag(e) {
        isDragging = true;
        
        if (e.type === 'mousedown') {
            startX = e.clientX;
            startY = e.clientY;
        } else if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
        
        // Get current translate values
        const transform = window.getComputedStyle(mapSvg).getPropertyValue('transform');
        if (transform && transform !== 'none') {
            const matrix = transform.match(/matrix.*\((.+)\)/)[1].split(', ');
            if (matrix.length >= 6) {
                currentTranslateX = parseFloat(matrix[4]) || 0;
                currentTranslateY = parseFloat(matrix[5]) || 0;
            }
        }
        
        mapSvg.style.transition = 'none';
    }
    
    // Drag the map
    function drag(e) {
        if (!isDragging) return;
        
        let clientX, clientY;
        
        if (e.type === 'mousemove') {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        translateX = currentTranslateX + (clientX - startX);
        translateY = currentTranslateY + (clientY - startY);
        
        // Limit panning
        const maxPan = 100; // Maximum allowed panning in pixels
        translateX = Math.max(Math.min(translateX, maxPan), -maxPan);
        translateY = Math.max(Math.min(translateY, maxPan), -maxPan);
        
        applyTransform();
    }
    
    // End dragging
    function endDrag() {
        isDragging = false;
        mapSvg.style.transition = 'transform 0.3s ease';
    }
    
    // Apply transformation to the map
    function applyTransform() {
        const scale = getCurrentScale(mapSvg);
        mapSvg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    
    // Get current scale value
    function getCurrentScale(element) {
        const transform = window.getComputedStyle(element).getPropertyValue('transform');
        if (transform && transform !== 'none') {
            const matrix = transform.match(/matrix.*\((.+)\)/)[1].split(', ');
            if (matrix.length >= 6) {
                return parseFloat(matrix[0]) || 1;
            }
        }
        return 1;
    }
}
