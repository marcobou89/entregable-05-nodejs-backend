const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include:[Genre,Actor,Director]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id,{include:[Genre,Actor,Director]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setGenres=catchError(async(req,res)=>{
    //identificar movie
    const {id}=req.params;
    const movie=await Movie.findByPk(id);
    //seteo los generos del movie
    await movie.setGenres(req.body)
    //obtengo lo que setee, con el objetivo de dar la vista
    const genres = await movie.getGenres()
    // retorno
    return res.json(genres)
    
})

const setActors=catchError(async(req, res)=>{
    //identificar movie
    const {id}=req.params;
    const movie=await Movie.findByPk(id);
    //seteo los actores del movie
    await movie.setActors(req.body)
    //obtengo lo que setee, con el objetivo de dar la vista
    const actors = await movie.getActors()
    // retorno
    return res.json(actors)
    
})

const setDirectors=catchError(async(req, res)=>{
    //identificar movie
    const {id}=req.params;
    const movie=await Movie.findByPk(id);
    //seteo el director del movie
    await movie.setDirectors(req.body)
    //obtengo lo que setee, con el objetivo de dar la vista
    const director = await movie.getDirectors()
    // retorno
    return res.json(director)
    
})


// const setCourses=catchError(async(req, res)=>{
//     // identificar al estudiante
//     const {id}=req.params;
//     const student=await Student.findByPk(id);
//     //seteo los cursos de los estudiantes
//     await student.setCourses(req.body)

//     //obtengo lo que setee, con el objetivo de dar la vista
//     const courses = await student.getCourses()

//     // retorno
//     return res.json(courses)
// })





// const getMoviesByGenre = catchError(async(req, res) => {
//     const { id } = req.params;
//     const movies = await Movie.findAll({ where: {genreId: id}, include:[Genre,Actor,Director]});
//     return res.json(movies);
// });

// const getMoviesByActor = catchError(async(req, res) => {
//     const { id } = req.params;
//     const movies = await Movie.findAll({ where: {actorId: id}, include:[Genre,Actor,Director]});
//     return res.json(movies);
// });

// const getMoviesByDirector = catchError(async(req, res) => {
//     const { id } = req.params;
//     const movies = await Movie.findAll({ where: {directorId: id}, include:[Genre,Actor,Director]});
//     return res.json(movies);
// });



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenres,
    setActors,
    setDirectors,
    
}