import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import React, { useState } from 'react'
import { useProductStore } from "../store/Product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  })
  const toast = useToast()
  const {createProduct} = useProductStore()
  const addProduct = async () => {
    const {success, message} = await createProduct(newProduct)
    if (success) {
      toast({
        title: "Product added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
    else {
      toast({
        title: "Failed to add product",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
    setNewProduct({ name: '', description: '', price: '', imageUrl: '' })
  }
  
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a new product
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
              placeholder='Product Description'
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
            />
            <Input
              placeholder='Product Price'
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
              placeholder='Product Image URL'
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
            />
            <Button onClick={addProduct} colorScheme={"blue"} w='full'>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage