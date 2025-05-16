import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Location } from './schema/location.schema';

import { CreateLocationDto } from './dto/create-location.dto';
import { GetLocationsDto } from './dto/get-locations.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) { }

  async findAll({
    page = 1,
    limit = 10,
    search,
    sort,
  }: GetLocationsDto): Promise<ResponseObject> {
    const conditions: any = {};

    if (search) {
      const regexSearch = new RegExp(String(search), 'i');
      conditions.$or = [
        { name: { $regex: regexSearch } },
        { address: { $regex: regexSearch } },
        { city: { $regex: regexSearch } },
      ];
    }

    const sortOptions: any = { createdAt: sort === 'desc' ? -1 : 1 };

    const locations = await this.locationModel
      .find(conditions)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

    const totalLocations = await this.locationModel.countDocuments(conditions);

    return {
      statusCode: HttpStatus.OK,
      locations,
      totalLocations,
    };
  }

  async findOne(id: string): Promise<ResponseObject> {
    const location = await this.locationModel.findById(id);

    if (!location) throw new NotFoundException('Location not found');

    return {
      statusCode: HttpStatus.OK,
      location,
    };
  }

  async create(body: CreateLocationDto): Promise<ResponseObject> {
    const newLocation = await this.locationModel.create(body);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Location created successfully',
      location: newLocation,
    };
  }

  async update(id: string, body: UpdateLocationDto): Promise<ResponseObject> {
    const location = await this.locationModel.findById(id).exec();

    if (!location) throw new NotFoundException('Location not found');

    const hasChanges = Object.keys(body).some(
      (key) => body[key] !== location[key],
    );
    if (!hasChanges) throw new NotFoundException('No changes found');

    const updatedLocation = await this.locationModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    );

    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Location updated successfully',
      location: updatedLocation,
    };
  }

  async delete(id: string): Promise<ResponseObject> {
    const deletedLocation = await this.locationModel.findByIdAndDelete(id);

    if (!deletedLocation) throw new NotFoundException('Location not found');

    return {
      statusCode: HttpStatus.OK,
      message: 'Location deleted successfully',
    };
  }
}
