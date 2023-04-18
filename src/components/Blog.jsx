import React, { Fragment, useEffect, useState } from 'react';
import { Table, Container, Row, Form, Button } from 'react-bootstrap';
import api from '../api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blog = (props) => {

    const [blog, setBlog] = useState({
        title: '',
        content: '',
        images: ''
    })

    const [blogList, setBlogList] = useState([])
    const [errors, setError] = useState({})
    const [img, setImg] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        api.blog.list()
            .then((res) => {
                setBlogList(res.data.data.records)
            })
            .catch((err) => { console.log(err) })
    }

    const handleName = (e) => {
        let newBlog = { ...blog }
        newBlog[e.target.name] = e.target.value
        setBlog(newBlog)
    }

    const handleSubmit = () => {

        if (blog._id) {
            api.blog.update(blog)
                .then((res) => {
                    if (res.status == 200) {
                        setImg(false)
                        getList()
                        setBlog({
                            title: '',
                            content: '',
                            images: ''
                        })
                    }
                })
                .catch((err) => { console.log(err) })
        } else {
            api.blog.add(blog)
                .then((res) => {
                    if (res.status == 201) {
                        setImg(false)
                        getList()
                        setBlog({
                            title: '',
                            content: '',
                            images: ''
                        })
                    }
                })
                .catch((err) => { console.log(err) })
        }

    }

    const addAddress = () => {
        // let newUser = { ...user }
        // var obj = {
        //     city: '',
        //     state: '',
        //     house_no: '',
        //     country: '',
        //     active: false
        // }
        // newUser['address'].push(obj)
        // setUser(newUser)
    }

    const deleteAddress = (i) => {
        // let newUser = { ...user }
        // newUser['address'].splice(i, 1)
        // setUser(newUser)
    }

    const handleAddress = (e, i) => {
        // let newUser = { ...user }
        // if (e.target.name == 'active') {
        //     newUser['address'][i][e.target.name] = e.target.checked
        // } else
        //     newUser['address'][i][e.target.name] = e.target.value
        // setUser(newUser)
    }

    const deleteUser = (u) => {
        console.log(u)
        api.user.remove(u)
            .then((res) => {
                if (res.status == 200) {
                    getList()
                }
            })
    }

    const editBlogs = (u) => {
        console.log(u)
        var i = u.images.includes(".");
        if (i) setImg(true)
        else setImg(false)
        setBlog(u)
    }

    const uploadImage = (e) => {


        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        api.blog.upload(formData)
            .then((res) => {
                let newBlog = { ...blog }
                newBlog['images'] = res.data.data.filename
                setBlog(newBlog)
                setImg(true)

            })
            .catch((err) => { console.log(err) })

    }

    const deleteBlog = (d) => {

        api.blog.delete(d._id)
            .then((res) => { if (res.status == 200) getList() })
    }

    const searchCall = () => {
        if (search !== '') {
            api.blog.search({ search: search })
                .then((res) => {
                    setBlogList(res.data.data.records)
                })
                .catch((err) => { console.log(err) })
        } else getList()
    }

    return (
        <>

            <Container>

                <Row className='py-5'>

                    <h5 className='py-4'>Add Blog</h5>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-5">
                            <input type="text" name='title' value={blog.title || ''} className="form-control" id="staticName" placeholder='Enter Name' onChange={handleName} />
                            <div className='form-control-feedback text-danger' type='invalid'>{errors.name}</div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Content</label>
                        <div className="col-sm-5">
                            <input type="text" name='content' value={blog?.content || ''} className="form-control" id="inpuAge" placeholder='Enter Age' onChange={handleName} />
                            <div className='form-control-feedback text-danger' type='invalid'>{errors.age}</div>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-5">
                            {!img ?
                                <input type="file" className="form-control" onChange={uploadImage} />
                                :
                                <img src={'http://localhost:3500/' + blog.images} className='h-50 w-50' />
                            }
                        </div>
                    </div>

                    <Button className='w-25' variant='primary' onClick={() => handleSubmit()}>{blog._id ? 'Update' : 'Submit'}  </Button>


                </Row>

                <Row>

                    <div class="input-group w-25">
                        <input type="search" class="form-control rounded" placeholder="Search with title." aria-label="Search" aria-describedby="search-addon" onChange={(e) => setSearch(e.target.value
                        )} />
                        <button type="button" class="btn btn-outline-primary" onClick={searchCall}>search</button>
                    </div>
                </Row>

                <Row className='py-5'>
                    <Table responsive="xl">
                        <thead>
                            <tr>
                                <th style={{ width: "5%" }}>Index</th>
                                <th style={{ width: "15%" }}>Title</th>
                                <th style={{ width: "15%" }}>Content</th>
                                <th style={{ width: "30%" }}>images</th>
                                <th style={{ width: "10%" }}>comments</th>
                                <th style={{ width: "10%" }}>Delete/Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogList?.map((u, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{u?.title}</td>
                                    <td>{u?.content}</td>
                                    <td><img src={'http://localhost:3500/' + u?.images} className='w-25 h-25' /></td>
                                    <td>
                                        {u.comment?.map((c) => {
                                            <span>{c}</span>
                                        })}
                                    </td>
                                    <td className='d-flex'>
                                        <button type="button" class="btn btn-primary w-25" style={{ fontSize: '10px' }}>Add Comment</button>
                                        <i className="material-icons" style={{ cursor: 'pointer' }} onClick={() => deleteBlog(u)}>delete</i>
                                        <i className='material-icons' style={{ cursor: 'pointer' }} onClick={() => editBlogs(u)}>fas fa-edit</i>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Row>
            </Container>

        </>
    );
};

export default Blog;