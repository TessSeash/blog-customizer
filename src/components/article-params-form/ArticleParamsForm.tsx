import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
	// пропс для функции, которая обновляет состояние статьи
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [modalState, setModalState] = useState(false); // состояние модального окна
	const [formData, setFormData] =
		useState<ArticleStateType>(defaultArticleState); // состояние формы, по умолчанию берется из defaultArticleState

	const articleRef = useRef<HTMLDivElement>(null); // реф для доступа к элементу статьи
	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setFormData((prev) => ({ ...prev, [key]: value })); // обновление состояния формы при изменении
	};

	function handleClick() {
		setModalState(!modalState); // переключение состояния модального окна при клике на кнопку
	}

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		setArticleState(formData);
	}

	function handleReset() {
		setFormData(defaultArticleState); // сброс формы к начальному состоянию
		setArticleState(defaultArticleState);
	}

	useOutsideClickClose({
		isOpen: modalState,
		rootRef: articleRef,
		onChange: setModalState,
		onClose: () => setModalState(false),
	});

	return (
		<>
			<ArrowButton isOpen={modalState} onClick={handleClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: modalState,
				})}
				ref={articleRef}>
				{/* если modalState - true, то добавить класс styles.container_open */}

				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 className={styles.formTitle}>Задайте параметры</h2>
					<Select
						title='Шрифт'
						selected={formData.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) =>
							handleChange('fontFamilyOption', value)
						}></Select>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formData.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value) =>
							handleChange('fontSizeOption', value)
						}></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={formData.fontColor}
						options={fontColors}
						onChange={(value) => handleChange('fontColor', value)}></Select>
					<Separator /> {/* Разделитель-полоска*/}
					<Select
						title='Цвет фона'
						selected={formData.backgroundColor}
						options={backgroundColors}
						onChange={(value) =>
							handleChange('backgroundColor', value)
						}></Select>
					<Select
						title='Ширина контента'
						selected={formData.contentWidth}
						options={contentWidthArr}
						onChange={(value) => handleChange('contentWidth', value)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
