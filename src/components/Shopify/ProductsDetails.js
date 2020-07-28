import React, {useState} from "react";


function ProductsDetails(props) {

    const [label, setLabel] = useState("Choose file...");
    const recordData = props.recordData;

    return (
        <div>
            {/* Input Handle*/}
            <div className="form-group row mr-auto mt-auto ml-auto">
                <label htmlFor="handle" className="col-sm-2 col-form-label">Handle</label>
                <div className="col-9">
                    <input type="text" className="form-control" id="handle"
                           placeholder={"Enter handle..."} name="handle" required/>
                </div>
            </div>

            {/* Input Title */}
            <div className="form-row" style={{margin: "auto"}}>
                <div className="col" style={{margin: "auto"}}>
                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-9">
                            <input type="text" className="form-control" id="title"
                                   defaultValue={recordData.cardName + " " + recordData.grade}
                                   name="title"
                                   required/>
                        </div>
                    </div>

                    {/* Input Body*/}
                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <label htmlFor="body" className="col-sm-2 col-form-label">Body</label>
                        <div className="col-9">
                            <textarea className="form-control" id="body"
                                      placeholder={"Enter description..."}
                                      name="body"
                                      required/>
                        </div>
                    </div>

                    {/* Input Tags*/}
                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <label htmlFor="tags" className="col-sm-2 col-form-label">Tags</label>
                        <div className="col-9">
                            <input type="text" className="form-control" id="tags"
                                   placeholder={"Enter comma separated tags..."} name="tags" required/>
                        </div>
                    </div>

                    {/* Input Price*/}
                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
                        <div className="col-9">
                            <input type="text" className="form-control" id="price"
                                   defaultValue={recordData.price}
                                   placeholder={"Enter price of product..."} name="price" required/>
                        </div>
                    </div>

                    {/* Input ComparePrice */}
                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <label htmlFor="comparePrice" className="col-sm-2 col-form-label">Compare</label>
                        <div className="col-9">
                            <input type="text" className="form-control" id="comparePrice"
                                   placeholder={"Compare Price..."} name="comparePrice" required/>
                        </div>
                    </div>

                    {/* Input Cost*/}
                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <label htmlFor="cost" className="col-sm-2 col-form-label">Cost</label>
                        <div className="col-9">
                            <input type="text" className="form-control" id="cost"
                                   defaultValue={recordData.cost}
                                   placeholder={"Enter cost of product..."} name="cost" required/>
                        </div>
                    </div>


                    {/* Input SKU*/}
                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <label htmlFor="sku" className="col-sm-2 col-form-label">SKU</label>
                        <div className="col-9">
                            <input type="text" className="form-control" id="sku"
                                   defaultValue={recordData.slot} name="sku" required/>
                        </div>
                    </div>


                    {/* Input Image File */}
                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <div className="col-2">
                            <label>Product Image</label>
                        </div>
                        <div className="col-9">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input name="productImage"
                                           type="file"
                                           className="custom-file-input"
                                           onChange={(e) => {
                                               setLabel("Product Image")
                                           }}
                                           required/>
                                    <label className="custom-file-label"> {label} </label>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProductsDetails