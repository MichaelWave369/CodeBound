// CodeBound non-load-bearing tabletop label holder, millimeters.
// Use only in a dry indoor setting for paper/card labels.
// NOT for electrical, structural, pressure, food or potable-water applications.
// 3D printers may emit particles/VOCs and have hot and moving parts.
// Consult NIOSH and printer/filament manufacturer for ventilation and handling.
base_width_mm = 80;
base_depth_mm = 40;
base_height_mm = 8;
slot_width_mm = 2.5;
slot_length_mm = 65;
slot_depth_mm = 5;

assert(base_width_mm > slot_length_mm + 8, "Leave side walls");
assert(base_depth_mm > slot_width_mm + 8, "Leave front/back walls");
assert(base_height_mm > slot_depth_mm + 2, "Leave a floor under the slot");
assert(slot_length_mm > 15 && slot_width_mm > 0 && slot_depth_mm > 0);
difference() {
    cube([base_width_mm, base_depth_mm, base_height_mm], center = false);
    translate([(base_width_mm - slot_length_mm) / 2,
               (base_depth_mm - slot_width_mm) / 2,
               base_height_mm - slot_depth_mm])
        cube([slot_length_mm, slot_width_mm, slot_depth_mm + 0.1], center = false);
}
