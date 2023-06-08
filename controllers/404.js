exports.notFound = (req, res, next) => {
    console.log(req.path);
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: req.path
    });
};