import React ,{ useState ,useEffect }from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'

import heroSliderData from '../assets/fake-data/hero-slider'
import policy from '../assets/fake-data/policy'
import productData from '../assets/fake-data/products'

import banner from '../assets/images/banner1.jpg'

import axios from "axios";



const Home = () => {
    const [produits, setproduits] = useState([]);
    const [categories, setcategories] = useState([]);
// const data  = 
useEffect(() => {
    axios.get(`http://localhost:4000/api/produits/`) .then(res=> setproduits(res.data.produit));
    
}, []);

useEffect(() => {
    axios.get(`http://localhost:4000/api/categories/`) .then(res=> setcategories(res.data.categorie));
}, []);


    let ref1;
    let ref2;
    let ref3;
   categories.map((item, index) => (
    item.nom === "Assiette végétarienne" ? ref1 = item._id 
    : item.nom === "Potée de légumes végétarienne" ? ref2 = item._id
    : item.nom === "salade végétariennes" ? ref3 = item._id
    :null
  ))
      
 
    return (
        <Helmet title="Eco Food">
            {/* hero slider */}
            <HeroSlider
                data={heroSliderData}
                control={true}
                auto={false}
                timeOut={5000}
            />
            {/* end hero slider */}

            {/* policy section */}
            <Section>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            policy.map((item, index) => <Link key={index} to="/policy">
                                <PolicyCard
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                />
                            </Link>)
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end policy section */}

            {/* best selling section */}
            <Section>
                <SectionTitle>
                Assiette végétarienne
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
                              item.categorie._id === ref1 ? 
                                <ProductCard
                                    key={index}
                                    img01={item.image}
                                    img02={item.image}
                                    name={item.nom}
                                    price={Number(item.prix)+"DH"}
                                    slug={item._id}
                                   
                                />
                                :null
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end best selling section */}

            {/* new arrival section */}
            <Section>
                <SectionTitle>
                Potée de légumes végétarienne
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
                              item.categorie._id === ref2 ? 
                                <ProductCard
                                    key={index}
                                    img01={item.image[0]}
                                    img02={item.image[1]}
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
            {/* end new arrival section */}
            
            {/* banner */}
            <Section>
                <SectionBody>
                    <Link to="/catalog">
                        <img src={banner} alt="" />
                    </Link>
                </SectionBody>
            </Section>
            {/* end banner */}

            {/* popular product section */}
            <Section>
                <SectionTitle>
                salade végétariennes
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
                              item.categorie._id === ref3 ? 
                                <ProductCard
                                    key={index}
                                    img01={item.image}
                                    img02={item.image}
                                    name={item.nom}
                                    price={Number(item.prix)+"DH"}
                                    slug={item._id}
                                   
                                />
                                :null
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end popular product section */}
        </Helmet>
    )
}

export default Home
