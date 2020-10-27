const server = require('../src/server')
const supertest = require('supertest')(server)

var newVisitor = {
  id: 25,
  visitorname: "Titch",
  visitorage: 19,
  dateofvisit: "2020-03-26T22:00:00.000Z",
  timeofvisit: "17:00:00",
  assistantsname: "Jack",
  comments: "Mate"
}
describe('Visitor', function () {
  it('Test addNewVisitor route', function(done) {
    supertest.post('/addNewVisitor').send(newVisitor).expect(200)
    done()
  })
  it('Test deleteVisitor route', function (done) {
    supertest.delete('/deleteVisitor:id').send({}).expect(200)
    done()
  })
  it('Test viewVisitors route', function (done) {
    supertest.get('/viewVisitors').expect(200)
    done()
  })
  it('Test viewVisitorid route', function (done) {
    supertest.get('/viewVisitor:id').expect(200)
    done()
  })
  it('Test updateVisitor route', function (done) {
    var updatedVisitor = {
      id: 25,
      visitorname: "Titch",
      visitorage: 19,
      dateofvisit: "2020-04-26T22:00:00.000Z",
      timeofvisit: "17:00:00",
      assistantsname: "Tony",
      comments: "Mate"
    }
    supertest.put('/updateVisitor:id').send(updatedVisitor).expect(200)
    done()
  })
  it('Test deleteAllVisitors route', function (done) {
    supertest.delete('/deleteAllVisitors').send({}).expect(200)
    done()
  })
})
