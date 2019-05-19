.PHONY: docs
docs: *.ts finicky-theme
	npx typedoc --out docs . --theme ./finicky-theme/ --name Finicky --mode modules --readme none