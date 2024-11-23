cp art/tileset.png public/

src_dir=art/map/simplified/level_0
target_dir=public/levels/level-0

mkdir -p $target_dir
cp -f $src_dir/_composite.png $target_dir
cp -f $src_dir/data.json $target_dir
