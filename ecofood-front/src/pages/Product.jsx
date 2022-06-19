import axios from "axios";
import React ,{ useState ,useEffect }from 'react'
import Helmet from '../components/Helmet'
import Section, {SectionBody, SectionTitle} from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'

import productData from '../assets/fake-data/products'

const Product = props => {

    const [produits, setproduits] = useState([]);
    const [categories, setcategories] = useState([]);

    // const data  = 
useEffect(() => {
    axios.get(`http://localhost:4000/api/produits/`) .then(res=> setproduits(res.data.produit));
    
}, []);

useEffect(() => {
    axios.get(`http://localhost:4000/api/categories/`) .then(res=> setcategories(res.data.categorie));
}, []);

    let ref4;
   categories.map((item, index) => (
    item.nom === "plats  végétariennes" ? ref4 = item._id
    :null
  ))

    const product="";
    produits.map((item, index) => (
        item._id === props.slug ? product=item : null
    ))

    const relatedProducts = productData.getProducts(8)

    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [product])

    return (
        <Helmet title="card">
            <Section>
                <SectionBody>
                    <ProductView product={product}/>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>
                plats  végétariennes
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        
                        {
                            
                            produits.map((item, index) => (
                              item.categorie._id === ref4 ? 
                                <ProductCard
                                    key={index}
                                    img01={item.image}
                                    img02={item.image}
                                    name={item.nom}
                                    price={Number(item.prix)}
                                    slug={item._id}
                                    
                                />
                                :null
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Product
