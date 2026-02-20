from PIL import Image, ImageFilter, ImageEnhance
import math

def remove_white_bg_eroded(input_path, output_path, strict_threshold=10, erosion_size=3):
    print(f"Processing {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    # 1. First pass: Basic thresholding to get a rough alpha mask
    newData = []
    wr, wg, wb = 255, 255, 255
    
    for item in datas:
        r, g, b, a = item
        dist = math.sqrt((r-wr)**2 + (g-wg)**2 + (b-wb)**2)
        
        if dist < strict_threshold:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    # 2. Extract Alpha Channel
    alpha = img.split()[3]
    
    # 3. Erode the Alpha Channel (Shrink the opaque area)
    # This cuts into the subject, effectively slicing off the white halo border
    # MinFilter(3) means a 3x3 kernel, replacing pixel with min value (0 if any neighbor is 0)
    eroded_alpha = alpha.filter(ImageFilter.MinFilter(erosion_size))
    
    # 4. Soften the edges of the new alpha (Anti-aliasing)
    # BoxBlur(1) makes the hard cut a bit smoother
    smooth_alpha = eroded_alpha.filter(ImageFilter.BoxBlur(1))
    
    # 5. Put new alpha back
    img.putalpha(smooth_alpha)
    
    # 6. Enhance for 3D look (Contrast + Saturation)
    # A bit more contrast and saturation makes it pop
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.1)  # 10% more contrast
    
    # Clean up RGB values in transparent areas to avoid weird halos if alpha is partially transparent
    # (Optional but good practice)
    
    img.save(output_path, "PNG")
    print(f"Saved eroded & enhanced image to {output_path}")

try:
    # Erosion size 5 is aggressive, should definitely kill the halo
    remove_white_bg_eroded("d:/PORTF/src/assets/BR.png", "d:/PORTF/src/assets/BR_transparent.png", strict_threshold=20, erosion_size=5)
except Exception as e:
    print(f"Error: {e}")
