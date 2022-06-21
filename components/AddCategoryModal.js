import styles from '../styles/AddCategoryModal.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import { useEffect, useState } from "react";
import closeSVG from '../public/images/close.svg'




export default function AddCategoryModal(props) {

    const [category, setCategory] = useState('');


    const handleCategoryChange = (event) => {

        setCategory(event.target.value);
    
    }
    
    

    const handleSubmit = async (event) => {

        const newCategory = `<option value = ${category.toLocaleLowerCase()}>${category}</option>`;
        props.setCategories([...props.categories, newCategory])
        setCategory('');
        props.handleModalClose();
    }

    if (!props.show){
        return null;
    }

    return (
        <div className = {styles.addCategorymodal} onClick = {e => e.stopPropagation()}>
            <div className={styles.closeSvg}>
                <button onClick={() => props.handleModalClose()}>
                    <Image width = {20} height = {20} alt = '' src = {closeSVG}/>
                </button>
            </div>
            <h4 className={styles.header}> Add Category:</h4>
            
                <label>
                    <input placeholder='Category' value = {category} onChange = {handleCategoryChange}/>
                </label>

                    <button disabled = {category.length < 0 ? true : false} className={styles.button} onClick={handleSubmit}>Add</button>
        </div>
    );
}
