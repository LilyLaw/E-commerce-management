GIT_HOME=/myproject/developer/
DIST_PATH=/myproject/product/front/

# 取第一个参数
if [ ! -n "$1" ];
then
	echo -e 'Please input the project name, you can input as follows:'
	echo -e './release_scripts.sh lllproject'
	exit
fi

echo -e '-----------Enter into your project-----------'
cd $GIT_HOME$1

# Clean dist
echo -e '-----------Clean dist-----------'
rm -rf ./dist

# Git pull your project
echo -e '-----------Git pull your project-----------'
git pull

# yarn install 安装项目
echo -e '-------------yarn install----------------'
yarn

# 打包项目
echo -e '-------------打包项目------------------'
yarn run dist

if [ -d "./dist" ];
then
	echo -e '------------------删除线上的dist---------------------'
	rm -rf $DIST_PATH$1/dist

	echo -e '------------------拷贝dist---------------------'
	cp -R ./dist $DIST_PATH$1/

	echo -e '------------------Deploy Success---------------------'
else
	echo -e '------------------Deploy Fail---------------------'
fi
